'use strict'

React = require 'react'
cardImage = require '../../images/abstract.jpeg'

{ a, div, h5, img, i, p } = React.DOM

class DocList extends React.Component
  constructor: (@props) ->
    super(@props)

    @state =
      docs: @props.docs,
      deletedDoc: null,
      token: localStorage.getItem('user')

  componentDidMount: ->
    # Checks whether the document is fully loaded
    # Sometimes this is 'interactive' or 'complete'
    # Complete - Page Navigation. Interactive - Page Reload
    # Credit: jamestease (http://bit.ly/29HSeYl)
    if document.readyState is 'interactive' || document.readyState is 'complete'
      # Activate the materialize tooltips
      window.$('.tooltipped').tooltip()

  componentWillUnmount: ->
    window.$('.tooltipped').tooltip('remove')

  renderDoc = (doc) ->
    return (
      div {className: 'col s12 m6 l4', key: (doc._id)},
        div {className: 'card'},
          div {className: 'card-image'},
            img {src: (cardImage)},
          div {className: 'card-content'},
            h5 {style: {fontSize: '1.44rem'}}, (doc.title)
            p null, "By:  #{doc.ownerId.name.first} #{doc.ownerId.name.last}"
            a {
              'className': 'btn-floating tooltipped blue lighten-1 right',
              'data-position': 'top',
              'data-delay': '50',
              'data-tooltip': 'View',
              'style': {position: 'relative', top: '-22px'},
              'href': "/documents/#{doc._id}"
            },
              i {className: 'material-icons'}, 'play_arrow'
    )

  render: ->
    return (
      div null, @state.docs.map renderDoc
    )

DocList.propTypes =
    docs: React.PropTypes.arrayOf React.PropTypes.object

module.exports = DocList
