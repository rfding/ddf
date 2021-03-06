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

const TabsView = require('../tabs.view')
const store = require('../../../js/store.js')

const WorkspaceContentTabsView = TabsView.extend({
  initialize() {
    TabsView.prototype.initialize.call(this)
    this.listenTo(
      this.options.selectionInterface,
      'change:currentQuery',
      this.handleQuery
    )
  },
  closePanelTwo() {
    switch (this.model.get('activeTab')) {
      case 'Searches':
        this.options.selectionInterface.setCurrentQuery(undefined)
        this.options.selectionInterface.setActiveSearchResults([])
        this.options.selectionInterface.clearSelectedResults()
        break
      default:
        store.get('content').set('query', undefined)
        this.options.selectionInterface.setCurrentQuery(undefined)
        this.options.selectionInterface.setActiveSearchResults([])
        this.options.selectionInterface.clearSelectedResults()
    }
  },
  determineContent() {
    const activeTab = this.model.getActiveView()
    this.tabsContent.show(
      new activeTab({
        selectionInterface: store,
      })
    )
  },
  onDestroy() {
    this.closePanelTwo()
  },
  handleQuery() {
    if (
      store.getCurrentQuery() !== undefined &&
      store.getCurrentQueries().get(store.getCurrentQuery()) !== undefined
    ) {
      this.model.set('activeTab', 'Search')
    }
  },
})

module.exports = WorkspaceContentTabsView
