import express from 'express'
import {
  getAllBuilds,
  getBuildByID,
  updateBuild,
  uploadBuild,
} from '../controllers/build.controller'

const build_router = express.Router()

build_router.get('/get-all-builds', getAllBuilds)

build_router.get('/get-build/:build_id', getBuildByID)

build_router.post('/upload_build', uploadBuild)

build_router.put('/update_build/:build_id', updateBuild)

export { build_router }
