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
import { hot } from 'react-hot-loader'
import Enum from '../enum'
const user = require('../../component/singletons/user-instance.js')

type Props = {
  selected: string
  updateAttrib: (selected: string) => void
}

type State = {
  showLabels: boolean
}

const Root = styled.div`
  overflow: auto;
  min-width: ${props => props.theme.minimumScreenSize};
  padding: ${props => props.theme.minimumSpacing};
`

const Button = styled.div`
  display: block;
  width: 100%;
  white-space: nowrap;
  padding: ${props => props.theme.minimumSpacing} 1.5em;
  position: relative;

  &.example-label,
  &.example-value {
    width: 50%;
    display: inline-block;
    vertical-align: middle;
    position: relative;
  }

  &.example-label {
    text-align: right;
  }
`

const Label = styled.label`
  .example-label & {
    vertical-align: middle;
    cursor: auto;
    font-weight: bolder;
    max-width: calc(100% - ${props => props.theme.minimumButtonSize});
    margin: 0px;
    line-height: 1.4;
    padding: ${props => props.theme.minimumSpacing} 0px;
    min-height: ${props => props.theme.minimumButtonSize};
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: normal;
    white-space: normal;
  }
`

const Span = styled.span`
  padding-left: ${props => props.theme.minimumSpacing};

  &.is-labeling {
    display: none;
  }
`

class LabelsPresentation extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      showLabels: user
        .get('user')
        .get('preferences')
        .get('showLabels'),
    }
  }

  toggleShowLabels = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault()
    console.log('clicked')
    const newState = !this.state.showLabels
    const preferences = user.get('user').get('preferences')
    preferences.set({
      showLabels: newState,
    })
    preferences.savePreferences()
    this.setState({ showLabels: newState })
  }

  render() {
    return (
      <Root>
        {/* TODO: insert button to toggle labels */}
        <Button>
          <Label>Show Labels</Label>
          <Span
            id="toggle-labels-off"
            className={
              this.state.showLabels
                ? 'fa fa-toggle-off is-button is-labeling'
                : 'fa fa-toggle-off is-button'
            }
            onClick={this.toggleShowLabels}
          />
          <Span
            id="toggle-labels-on"
            className={
              !this.state.showLabels
                ? 'fa fa-toggle-on is-button is-labeling'
                : 'fa fa-toggle-on is-button'
            }
            onClick={this.toggleShowLabels}
          />
        </Button>

        <Enum
          options={[
            { label: 'Title', value: 'title' },
            { label: 'Date', value: 'date' },
          ]}
          value={this.props.selected}
          label="Label Attribute"
          onChange={this.props.updateAttrib}
        />
      </Root>
    )
  }
}

// const render = (props: Props) => {
//   const { selected, updateAttrib, toggleShowLabels } = props
//   return (
//     <Root>
//       {/* TODO: insert button to toggle labels */}
//       <Button>
//           <Label>Show Labels</Label>
//           <Span id="toggle-labels-off" className="fa fa-toggle-off is-button" onClick={() => toggleShowLabels}/>
//           <Span id="toggle-labels-on" className="fa fa-toggle-on is-button is-labeling" onClick={() => toggleShowLabels}/>
//       </Button>

//       <Enum
//         options={[
//           { label: 'Title', value: 'title' },
//           { label: 'Date', value: 'date' },
//         ]}
//         value={selected}
//         label="Label Attribute"
//         onChange={updateAttrib}
//       />
//     </Root>
//   )
// }

export default hot(module)(LabelsPresentation)
// export const testComponent = LabelsPresentation
