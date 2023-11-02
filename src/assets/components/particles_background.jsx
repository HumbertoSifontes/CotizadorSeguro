import React, { useCallback } from 'react'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import particles_config from './particles_config'

const ParticlesBackground = () => {

    const particlesInit = useCallback((engine) => {

        loadFull(engine)

    }, [])

  return (
    <div>
        <Particles
        id='tsparticles'
        options={particles_config}
        init={particlesInit}
        />
    </div>
  )
}

export default ParticlesBackground