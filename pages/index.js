import React, { Component } from 'react'
import Link from 'next/link'
import store from 'store'
import { permanentLinks, riders } from '../data'
import Layout from '../components/Layout'
import DayOne from './one'
import DayTwo from './two'
import DayThree from './three'
import DayFour from './four'
import '../style.css'

class Index extends Component {
  state = {
    links: permanentLinks,
    href: '',
    text: ''
  }

  // TODO
  // - create handleSave method that sets state & saves to store

  componentDidMount() {
    const links = store.get('links')

    if (links && links.length) {
      this.setState({ links })
    }
  }

  handleChange = (keyName, value) => this.setState({ [keyName]: value })

  handleSubmit = ev => {
    const { href, text, links } = this.state

    if (text.trim() === 'resetlinks') {
      if (global.confirm('Reset links?')) {
        return store.clearAll()
      }
    }

    ev.preventDefault()

    const newLinks = [...links, { href, text, timestamp: new Date().valueOf() }]

    this.setState({
      links: newLinks,
      href: '',
      text: ''
    })
    store.set('links', newLinks)
  }

  // handleUpdateTimestamp = index => {
  //   const { links } = this.state
  //   const { href, text } = links[index]

  //   const newLinks = links.filter(x => href !== x.href)
  //   newLinks.push({ href, text, timestamp: new Date().valueOf() })

  //   this.setState({ links: newLinks })
  //   store.set('links', newLinks)
  // }

  handleDelete = index => {
    const newLinks = this.state.links.filter((x, i) => i !== index)

    if (global.confirm('Delete link?')) {
      this.setState({ links: newLinks })
      store.set('links', newLinks)
    }
  }

  render() {
    const { href, text, links } = this.state

    return (
      <Layout>
        <h1 className="f2 mt0 mb4">Dakar 2019</h1>
        <div className="flex-ns">
          <div className="w-third-ns">
            <h2 className="f4 mt0 mb4">Links</h2>
            <div className="vh-75-ns overflow-y-auto-ns pr2-ns">
              <ul className="pl4 mt0 mb4">
                {links.map(({ href, text, timestamp }, index) => (
                  <li key={index} className="mb2">
                    <div className="flex justify-between">
                      <div>
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link blue hover-dark-blue"
                        >
                          {text}
                        </a>
                        <span
                          className="red ml2 pointer"
                          onClick={() => this.handleDelete(index)}
                        >
                          X
                        </span>
                      </div>
                      {timestamp ? (
                        <span className="gray tab-nums">
                          {new Date(timestamp).toLocaleString()}
                        </span>
                      ) : (
                        ''
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <h2 className="f4 mt0 mb4">Add New Link</h2>
              <form onSubmit={this.handleSubmit} className="mb4">
                <input
                  type="text"
                  value={text}
                  className="input-reset ba b--light-gray br1 pa1 mr1-ns mb1 mb0-ns"
                  placeholder="Name"
                  onChange={ev => this.handleChange('text', ev.target.value)}
                />
                <input
                  type="text"
                  value={href}
                  className="input-reset ba b--light-gray br1 pa1 mr1-ns mb1 mb0-ns"
                  placeholder="Link"
                  onChange={ev => this.handleChange('href', ev.target.value)}
                />
                <input
                  value="Add Link"
                  type="submit"
                  className="input-reset ba b--light-gray br1 pv1 ph2 mr1 black-80"
                />
              </form>
            </div>
          </div>
          <div className="w-third-ns">
            <h2 className="f4 mt0 mb4">Riders</h2>
            <div className="vh-75-ns overflow-y-auto-ns">
              <ul className="pl4 mt0 mb4">
                {riders.map(({ name, bib, country }, index) => (
                  <li key={index} className="mb2">
                    {bib} &mdash; {name} ({country})
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-third-ns">
            <h2 className="f4 mt0 mb4">Images</h2>
            <div className="vh-75-ns overflow-y-auto-ns pb7">
              {
                <Link prefetch href="/four">
                  <a className="link blue hover-dark-blue">
                    <DayFour />
                  </a>
                </Link>
              }
              <Link prefetch href="/three">
                <a className="link blue hover-dark-blue">
                  <DayThree />
                </a>
              </Link>
              <Link prefetch href="/two">
                <a className="link blue hover-dark-blue">
                  <DayTwo />
                </a>
              </Link>
              <Link prefetch href="/one">
                <a className="link blue hover-dark-blue">
                  <DayOne />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Index
