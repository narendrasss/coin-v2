export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('store')
    if (!serializedState) return undefined
    return JSON.parse(serializedState)
  } catch (e) {
    return undefined
  }
}

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('store', serializedState)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
  }
}
