import { HemisphericLight, Vector3, MeshBuilder, PBRMetallicRoughnessMaterial, Color3, SceneLoader } from '@babylonjs/core'
import { createEngine, createScene, createPBRSkybox, createArcRotateCamera } from './babylon'
import '@babylonjs/loaders/glTF/2.0'

import './style.css'

const canvas = document.getElementById('app')
const engine = createEngine(canvas)
const scene = createScene()

createPBRSkybox()
createArcRotateCamera()

function createLights() {
  const light = new HemisphericLight('light', Vector3.Zero(), scene)
  light.intensity = 0.3
}

function createGround() {
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
}

function createCube() {
  const cubeMesh = MeshBuilder.CreateBox('cube', { size: 2 }, scene)
  const cubeMat = new PBRMetallicRoughnessMaterial('cube-material', scene)
  cubeMat.baseColor = Color3.FromHexString('#ffcc44')
  cubeMat.metallic = 1
  cubeMat.roughness = 0.3
  cubeMesh.material = cubeMat
  cubeMesh.position = new Vector3(5, 2, 5)
}

async function loadSpheres() {
  const container = await SceneLoader.LoadAssetContainerAsync('/models/spheres.glb', undefined, scene)
  container.addAllToScene()
  // container.meshes[0].position.x = 30
}

/**
 * Main function that is run on startup
 */
async function main() {
  createLights()
  // createGround()
  await loadSpheres()

  // Start the scene
  engine.runRenderLoop(() => {
    scene.render()
  })
}

main().catch(console.error)
