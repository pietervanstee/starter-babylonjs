import 'pepjs'

import { HemisphericLight, Vector3, MeshBuilder, PBRMetallicRoughnessMaterial, Color3, SceneLoader } from '@babylonjs/core'
import { createEngine, createScene, createPBRSkybox, createArcRotateCamera } from './babylon'

// Import stylesheets
// import './index.css';

const canvas: HTMLCanvasElement = document.getElementById('root') as HTMLCanvasElement
const engine = createEngine(canvas)
const scene = createScene()

// main function that is async so we can call the scene manager with await
const main = async () => {

  createPBRSkybox()
  createArcRotateCamera()


  const light = new HemisphericLight('light', Vector3.Zero(), scene)
  light.intensity = 0.3


  // add ground
  const groundMesh = MeshBuilder.CreatePlane('ground', { size: 100 }, scene)
  const groundMat = new PBRMetallicRoughnessMaterial('ground-material', scene)
  groundMat.baseColor = new Color3(0.1, 0.1, 0.1)
  groundMat.metallic = 0
  groundMat.roughness = 0.6
  groundMat.backFaceCulling = false
  groundMat.freeze() // freeze the ground material for better performance

  groundMesh.material = groundMat
  groundMesh.rotation = new Vector3(Math.PI / 2, 0, 0)
  groundMesh.freezeWorldMatrix() // since we are not going to be moving the ground, we freeze it for better performance


  // add cube
  // const cubeMesh = MeshBuilder.CreateBox('cube', { size: 2 }, scene)
  // const cubeMat = new PBRMetallicRoughnessMaterial('cube-material', scene)
  // cubeMat.baseColor = Color3.FromHexString('#ffcc44')
  // cubeMat.metallic = 1
  // cubeMat.roughness = 0.3
  // cubeMesh.material = cubeMat
  // cubeMesh.position = new Vector3(5, 2, 5)

  // load a gltf model
  const container = await SceneLoader.LoadAssetContainerAsync('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/', 'MetalRoughSpheres/glTF-Binary/MetalRoughSpheres.glb', scene)
  container.addAllToScene()
  container.meshes[0].position.x = 30

  // Start the scene
  engine.runRenderLoop(() => {
    scene.render()
  })
}

// start the program
main()
