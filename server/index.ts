import express from 'express'
import { MongoClient, ServerApiVersion } from 'mongodb'
import dotenv from 'dotenv'
import multer from 'multer'
import { Build } from './models/build.model'
dotenv.config()
const app = express()
app.use(express.json())
const port = 3000
const upload = multer({ dest: './build-images' })

const client = new MongoClient(process.env.DATABASE_URL ?? '', {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect()
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 })
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    )
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/get-all-builds', async (req, res) => {
  try {
    const builds = await Build.find({})
    res.send(200).json(builds)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

app.get('/api/get-build/:build_id', async (req, res) => {
  try {
    const build = await Build.findById(req.params.build_id)
    res.send(200).json(build)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

app.post('/api/upload_build', async (req, res) => {
  try {
    if (req.body.imgs > 20) throw new Error('You can send a maximum of 20 imgs')
    await Build.create(req.body)
    res.send(200)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

app.put('/api/update_build/:build_id', async (req, res) => {
  try {
    const build = await Build.findByIdAndUpdate(req.params.build_id, req.body)

    if (!build) return res.send(404).json({ message: 'Build not found' })

    res.status(200).json({ message: 'Build successfully updated' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
