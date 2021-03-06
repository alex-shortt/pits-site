import * as THREE from "three"
import Stats from "stats-js"
import { Sky } from "three/examples/jsm/objects/Sky"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { RoughnessMipmapper } from "three/examples/jsm/utils/RoughnessMipmapper"

import keanuModel from "../models/keanu/keanu3.glb"

let mouseY
let hoverOnKeanu
let rotSpeed = 0.0004

let lastUpdate = Date.now()

export class ThreeScene {
  threeSetup = (containerRef, history) => {
    // get container dimensions and use them for scene sizing
    const { clientWidth: width, clientHeight: height } = containerRef

    mouseY = 0
    // camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 2000)
    camera.position.set(0, 1.3, 0.8)
    camera.rotation.set(315, 0, 0)
    camera.lookAt(0, 0.25, 0)

    // scene
    const scene = new THREE.Scene()
    const ambientLight = new THREE.AmbientLight(0xffffff, 2)
    scene.add(ambientLight)

    // light
    const directionalLight = new THREE.PointLight(0xffffff, 1.5)
    directionalLight.position.x = 0
    directionalLight.position.y = 2
    directionalLight.position.z = 0
    scene.add(directionalLight)
    scene.add(camera)

    // renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)

    // stats
    const stats = new Stats()
    // containerRef.appendChild(stats.dom)

    containerRef.appendChild(renderer.domElement)
    // exports
    this.containerRef = containerRef
    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.stats = stats
    this.history = history

    // events
    window.addEventListener("resize", this.handleWindowResize)
    document.addEventListener("mousemove", this.onDocumentMouseMove, false)
    document.addEventListener("click", this.onClick, false)

    this.render()
  }

  handleWindowResize = () => {
    const { containerRef, renderer, camera } = this

    const { clientWidth: width, clientHeight: height } = containerRef

    // resize renderer
    renderer.setSize(width, height)

    // camera
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }

  initSky = () => {
    const { scene } = this

    // Add Sky
    const sky = new Sky()
    sky.scale.setScalar(450000)
    scene.add(sky)

    // Add Sun Helper
    const sunSphere = new THREE.Mesh(
      new THREE.SphereBufferGeometry(20000, 16, 8),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    )
    sunSphere.position.y = -700000
    sunSphere.visible = false
    scene.add(sunSphere)

    const effectController = {
      turbidity: 10,
      rayleigh: 2,
      mieCoefficient: 0.025,
      mieDirectionalG: 0.985,
      luminance: 1,
      inclination: 0.1714, // elevation / inclination
      azimuth: 0.25, // Facing front,
      sun: false
    }

    const distance = 400000

    sky.material.uniforms.turbidity.value = effectController.turbidity
    sky.material.uniforms.rayleigh.value = effectController.rayleigh
    sky.material.uniforms.mieCoefficient.value = effectController.mieCoefficient
    sky.material.uniforms.mieDirectionalG.value =
      effectController.mieDirectionalG
    sky.material.uniforms.luminance.value = effectController.luminance

    const theta = Math.PI * (effectController.inclination - 0.5)
    const phi = 2 * Math.PI * (effectController.azimuth - 0.5)

    sunSphere.position.x = distance * Math.cos(phi)
    sunSphere.position.y = distance * Math.sin(phi) * Math.sin(theta)
    sunSphere.position.z = distance * Math.sin(phi) * Math.cos(theta)

    sunSphere.visible = effectController.sun

    sky.material.uniforms.sunPosition.value.copy(sunSphere.position)
  }

  onDocumentMouseMove = event => {
    const { containerRef } = this
    const { clientWidth: width, clientHeight: height } = containerRef

    // mouseX = (event.clientX - width / 2) / (width / 2)
    // mouseY = (event.clientY - height / 2) / (height / 2)

    const { mouse, renderer, camera, keanu, raycaster } = this

    if (!mouse || !renderer || !camera || !raycaster) {
      return
    }

    const keanuHimself = keanu.children[0].children[0].children[0].children[0]

    mouse.x = (event.clientX / width) * 2 - 1
    mouse.y = -(event.clientY / height) * 2 + 1
    raycaster.setFromCamera(mouse, camera)

    for (let i = 0; i < keanuHimself.children.length; i += 1) {
      const intersects = raycaster.intersectObject(keanuHimself.children[i])
      if (intersects.length > 0) {
        hoverOnKeanu = true
        break
      }
      hoverOnKeanu = false
    }

    if (hoverOnKeanu && width > 768) {
      // containerRef.style.filter = "brightness(0.7)"
      containerRef.style.cursor = "pointer"
      rotSpeed = 0.0001

      // bright material
      for (let i = 0; i < keanuHimself.children.length; i += 1) {
        const mesh = keanuHimself.children[i]
        mesh.material.emissive = new THREE.Color(0xaaaaaa)
        mesh.material.emissiveIntensity = 0.5
      }
    } else {
      // containerRef.style.filter = "none"
      containerRef.style.filter = "inherit"
      rotSpeed = 0.0004

      // bright material
      for (let i = 0; i < keanuHimself.children.length; i += 1) {
        const mesh = keanuHimself.children[i]
        mesh.material.emissive = new THREE.Color("black")
      }
    }
  }

  onClick = event => {
    if (hoverOnKeanu && this.history) {
      this.history.push("/matrix-tee")
    }
  }

  initKeanu = setLoaded => {
    const { renderer, scene } = this

    const roughnessMipmapper = new RoughnessMipmapper(renderer)
    new GLTFLoader().load(keanuModel, gltf => {
      gltf.scene.traverse(child => {
        if (child.isMesh) {
          roughnessMipmapper.generateMipmaps(child.material)
        }
      })

      scene.add(gltf.scene)
      setLoaded(true)

      roughnessMipmapper.dispose()

      // for raycasting
      const mouse = new THREE.Vector2()
      const raycaster = new THREE.Raycaster()

      // exports
      this.keanu = gltf.scene
      this.raycaster = raycaster
      this.mouse = mouse
      //  console.log(gltf.scene)
    })

    const geometry = new THREE.ConeBufferGeometry(20, 100, 3)
    geometry.translate(0, 50, 0)
    geometry.rotateX(Math.PI / 2)
  }

  startAnimationLoop = () => {
    const { stats, keanu } = this

    const now = Date.now()
    const dt = now - lastUpdate
    lastUpdate = now

    stats.begin()
    this.render()
    if (keanu) {
      keanu.rotation.y += rotSpeed * dt
    }
    stats.end()

    this.requestID = requestAnimationFrame(this.startAnimationLoop)
  }

  render = () => {
    const { camera, scene, renderer } = this

    // camera.position.x = mouseX * 0.35
    camera.position.y = 1 + mouseY * -0.1
    camera.lookAt(0, 0.35, 0)

    renderer.render(scene, camera)
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
