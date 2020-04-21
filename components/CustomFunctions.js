export function getFunctionsAsParams(props, screenName, paramName) {
  const end =
    props.route.state.routes !== undefined ? props.route.state.routes : 0;
  let value = () => {};
  if (end !== 0) {
    for (var i = 0; i < end.length; i++) {
      if (end[i].name === screenName) {
        value = end[i].params[paramName];
        break;
      }
    }
  }
  value();
}

export function getParams(props, screenName, paramName) {
  const end =
    props.route.state.routes !== undefined ? props.route.state.routes : 0;

  let value = null;
  if (end !== 0) {
    for (var i = 0; i < end.length; i++) {
      if (end[i].name === screenName) {
        value = end[i].params[paramName];
        break;
      }
    }
  }
  return value;
}
