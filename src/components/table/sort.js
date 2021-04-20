export default {
  data(){
    return {
      sortFilter: [],
      fieldsStyle: {},
      mappingOrder: {
        'descending': 'desc',
        'ascending': 'asc'
      }
    }
  },
  methods:{
    handleSortChange({ prop, order }) {
      if (order === null) {
        this.fieldsStyle[prop] = ''
        let index = this.sortFilter.findIndex(item => {
          return item['field'] === prop
        })
        if (index !== -1) {
          this.sortFilter.splice(index, 1)
        }
      } else {
        this.fieldsStyle[prop] = order
        let index = this.sortFilter.findIndex(item => {
          return item['field'] === prop
        })
        if (index === -1) {
          this.sortFilter.push({ field: prop, order: this.mappingOrder[order] })
        } else {
          this.sortFilter[index].order = this.mappingOrder[order]
        }
      }
      this.$emit('sort-change', this.sortFilter)
    },
    handleHeaderStyle({ column }) {
      if (this.fieldsStyle[column.property]) {
        column.order = this.fieldsStyle[column.property]
      }
    }
  }
}
