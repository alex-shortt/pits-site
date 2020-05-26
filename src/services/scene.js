import * as THREE from "three"
import Stats from "stats-js"

export class ThreeScene {
  threeSetup = containerRef => {
    // get container dimensions and use them for scene sizing
    const { clientWidth: width, clientHeight: height } = containerRef

    // scene
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x000000, 250, 2000)

    // camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 2, 2000)
    camera.position.set(0, 0, -5)
    camera.lookAt(0, 0, 1200)

    // renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    renderer.setClearColor(scene.fog.color, 1)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.autoClear = false
    containerRef.appendChild(renderer.domElement) // mount using React ref

    // stats
    const stats = new Stats()
    document.body.appendChild(stats.dom)

    // exports
    this.containerRef = containerRef
    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.stats = stats

    // events
    window.addEventListener("resize", this.handleWindowResize)
  }

  sceneSetup = () => {
    const { scene } = this

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
  }

  startAnimationLoop = () => {
    const { renderer, scene, camera, stats } = this

    stats.begin()
    renderer.render(scene, camera)
    stats.end()

    this.requestID = window.requestAnimationFrame(this.startAnimationLoop)
  }

  handleWindowResize = () => {
    const { containerRef, renderer, camera, environment, noisebox } = this
    const { clientWidth: width, clientHeight: height } = containerRef

    // resize renderer
    renderer.setSize(width, height)

    // camera
    camera.aspect = width / height
    camera.updateProjectionMatrix()

    // resize classes
    environment.handleResize()
    noisebox.handleResize()
  }

  /**
   * To be called when you leave the page
   */
  unmount = () => {
    const { requestID, controls } = this

    window.removeEventListener("resize", this.handleWindowResize)
    window.cancelAnimationFrame(requestID)
    controls.dispose()
  }
}
