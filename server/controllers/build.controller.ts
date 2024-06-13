import { Request, Response } from 'express'
import { Build } from '../models/build.model'

export const getAllBuilds = async (_req: Request, res: Response) => {
  try {
    const builds = await Build.find({})
    res.status(200).json(builds)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export const getBuildByID = async (req: Request, res: Response) => {
  try {
    const build = await Build.findById(req.params.build_id)
    res.sendStatus(200).json(build)
  } catch (error) {
    res.sendStatus(500).json({ message: error })
  }
}

export const uploadBuild = async (req: Request, res: Response) => {
  try {
    if (req.body.imgs > 20) throw new Error('You can send a maximum of 20 imgs')
    await Build.create(req.body)
    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(500).json({ message: error })
  }
}

export const updateBuild = async (req: Request, res: Response) => {
  try {
    const build = await Build.findByIdAndUpdate(req.params.build_id, req.body)

    if (!build) res.sendStatus(404).json({ message: 'Build not found' })

    res.sendStatus(200).json({ message: 'Build successfully updated' })
  } catch (error) {
    res.sendStatus(500).json({ message: error })
  }
}
