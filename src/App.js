import Routes from './routes'
import GitHubCorner from './components/GitHubCorner'

function App() {
  return (
    <>
      <GitHubCorner projectUrl='https://github.com/arthurDamiani/gerenciadorCadastro' />
      <Routes />
    </>
  );
}

export default App
