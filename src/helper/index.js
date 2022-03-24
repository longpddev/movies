export function parse_query_string(query) {
  var vars = query.split('&')
  var query_string = {}
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    var key = decodeURIComponent(pair.shift())
    var value = decodeURIComponent(pair.join('='))
    if (typeof query_string[key] === 'undefined') {
      query_string[key] = value
    } else if (typeof query_string[key] === 'string') {
      var arr = [query_string[key], value]
      query_string[key] = arr
    } else {
      query_string[key].push(value)
    }
  }
  return query_string
}
