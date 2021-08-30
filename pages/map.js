import dynamic from 'next/dynamic'
const SmartMap = dynamic(() => import('../components/SmartMap'), { ssr: false })

function Map() {
  return (
    <div id="map">
      <SmartMap />
    </div>
  )
}

export default Map
