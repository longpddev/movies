function renderChildren (props) {
  if(props.render) return props.render
  return props.children
}

function elseRenderChildren (props) {
  if(props.elseRender) return props.elseRender
  return null
}

const When = (props) => Boolean(props.if) ? renderChildren(props) : elseRenderChildren(props)

export default When