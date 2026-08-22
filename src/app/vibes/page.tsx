"use client"

const page = () => {
  return (
    <section>
      <h2>Vibes Test</h2>
      <div className='vibration-container'>
        <div onClick={() => navigator.vibrate(100)}>Vibrate 100</div>
        <div onClick={() => navigator.vibrate(200)}>Vibrate 200</div>
        <div onClick={() => navigator.vibrate(300)}>Vibrate 300</div>
        <div onClick={() => navigator.vibrate(400)}>Vibrate 400</div>
        <div onClick={() => navigator.vibrate(500)}>Vibrate 500</div>
        <div onClick={() => navigator.vibrate(600)}>Vibrate 600</div>
        <div onClick={() => navigator.vibrate(700)}>Vibrate 700</div>
        <div onClick={() => navigator.vibrate(800)}>Vibrate 800</div>
        <div onClick={() => navigator.vibrate(900)}>Vibrate 900</div>
        <div onClick={() => navigator.vibrate(1000)}>Vibrate 1000</div>
      </div>
    </section>
  )
}

export default page
