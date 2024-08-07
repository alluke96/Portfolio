import { defineStore } from 'pinia'

interface Breadcrumb {
  label: string
  path: string
}

interface State {
  breadcrumbs: Breadcrumb[]
}

export const useBreadcrumbStore = defineStore('breadcrumbs', {
  state: (): State => ({
    breadcrumbs: []
  }),
  actions: {
    getBreadcrumbs() {
      return this.breadcrumbs
    },
    setBreadcrumbs(breadcrumbs: Breadcrumb[]) {
      this.breadcrumbs = breadcrumbs
    },
    addBreadcrumb(breadcrumb: Breadcrumb) {
      if (!this.breadcrumbs.find(crumb => crumb.path === breadcrumb.path)) {
        this.breadcrumbs.push(breadcrumb)
      }
    }
  }
})
