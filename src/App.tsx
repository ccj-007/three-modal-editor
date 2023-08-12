import Page from "./views/Page"
import { sceneRender } from './three'
import { useEffect } from "react"

function App() {
  useEffect(() => {
    sceneRender()
  }, [])

  return (
    <div id="container">
      <Page />
    </div>
  )
}

export default App
