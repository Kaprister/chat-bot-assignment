import React from 'react'
import Chatbot from './components/Chatbot'
import Bgimage from './components/chatbotimage.jpg'

const App = () => {
  return (
    <div>
      <div>
         <img src={Bgimage} alt='background' className='w-full h-[100vh]' />
      </div>
      <Chatbot/>
    </div>
  )
}

export default App
