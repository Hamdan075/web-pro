import './App.css'
function Header(){
  return( 
    <>
  <h1>React Project</h1>
  <hr></hr>
  </>
)
}
function Body(){
  return(
  <>
  <p>My Name is: Hamdan </p>
  <p>My roll No. is: FA23-BSE-099</p>
  <p>University: COMSATS</p>
  </>
  )
}
function Footer(){
  return <><hr></hr><footer>© 2026</footer></>
}
function App() {
  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  )
}
export default App