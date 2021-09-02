import dynamic from 'next/dynamic'
// import SmartMap from '../components/SmartMap'
const SmartMap = dynamic(() => import('../components/SmartMap'), { ssr: false })

function Map() {
  return (
    <div style={{ height: 800 }}>
      <SmartMap />
    </div>
  )
}

export default Map
