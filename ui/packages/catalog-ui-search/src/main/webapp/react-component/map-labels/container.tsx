/**
 * Copyright (c) Codice Foundation
 *
 * This is free software: you can redistribute it and/or modify it under the terms of the GNU Lesser
 * General Public License as published by the Free Software Foundation, either version 3 of the
 * License, or any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details. A copy of the GNU Lesser General Public License
 * is distributed along with this program and can be found at
 * <http://www.gnu.org/licenses/lgpl.html>.
 *
 **/
import * as React from 'react'
import styled from 'styled-components'
import MapLabelsPresentation from './presentation'
import Dropdown from '../presentation/dropdown'
import { hot } from 'react-hot-loader'
import withListenTo, {
  WithBackboneProps,
} from '../../react-component/backbone-container'
const announcement = require('../../component/announcement')
const user = require('../../component/singletons/user-instance.js')

const saveAttrib = (newAttrib: string) => {
  const preferences = user.get('user').get('preferences')
  preferences.set({
    labelAttribute: newAttrib,
  })
  preferences.savePreferences()
}

const Span = styled.span`
  padding-right: 5px;
`
type State = {
  selected: string
  showLabels: boolean
}

class MapLabels extends React.Component<WithBackboneProps, State> {
  constructor(props: WithBackboneProps) {
    super(props)
    this.state = {
      selected: user
        .get('user')
        .get('preferences')
        .get('labelAttribute'),
      showLabels: user
        .get('user')
        .get('preferences')
        .get('showLabels'),
    }
  }

  componentDidMount = () => {
    this.props.listenTo(
      user.get('user').get('preferences'),
      'change:labelAttribute',
      (_prefs: any, value: string) => this.setState({ selected: value })
    )
    this.props.listenTo(
      user.get('user').get('preferences'),
      'change:showLabels',
      (_prefs: any, value: boolean) => this.setState({ showLabels: value })
    )
  }

  updateAttrib(newAttrib: string) {
    saveAttrib(newAttrib)
    this.setState({ selected: newAttrib })
    announcement.announce({
      title: 'Label attribute changed',
      message: 'Re-run search to update map labels.',
      type: 'success',
    })
  }

  render() {
    const { selected, showLabels } = this.state

    const mapLabelsProps = {
      selected,
      showLabels,
      updateAttrib: (newAttrib: string) => this.updateAttrib(newAttrib),
    }

    const mapLabels = <MapLabelsPresentation {...mapLabelsProps} />

    return (
      <Dropdown content={mapLabels}>
        <Span className="interaction-text">Labels</Span>
        <Span className="interaction-icon fa fa-pencil-square-o" />
      </Dropdown>
    )
  }
}

export default hot(module)(withListenTo(MapLabels))
// export const testComponent = withListenTo(MapLabels)
