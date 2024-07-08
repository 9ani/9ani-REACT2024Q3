import { Component } from 'react';
import SearchComponent from './components/SearchComponent';
import ResultsComponent from './components/ResultsComponent';
import ErrorBoundary from './components/ErrorBoundary';

interface State {
  results: { name: string; description: string }[];
  loading: boolean;
}

class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { results: [], loading: false };
  }

  componentDidMount() {
    this.fetchResults('');
  }

  fetchResults = (searchTerm: string) => {
    this.setState({ loading: true });
    let url = `https://pokeapi.co/api/v2/pokemon`;
    if (searchTerm) {
      url += `/${searchTerm.toLowerCase()}`;
    }
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (searchTerm) {
          this.setState({
            results: [{ name: data.name, description: data.url }],
            loading: false,
          });
        } else {
          const results = data.results.map((item: any) => ({
            name: item.name,
            description: item.url,
          }));
          this.setState({
            results,
            loading: false,
          });
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        this.setState({ loading: false });
      });
  };

  handleSearch = (searchTerm: string) => {
    this.fetchResults(searchTerm);
  };

  render() {
    const { results, loading } = this.state;

    return (
      <ErrorBoundary>
        <div>
          <div style={{ height: '20vh' }}>
            <SearchComponent onSearch={this.handleSearch} />
          </div>
          <div style={{ height: '80vh' }}>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <ResultsComponent results={results} />
            )}
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;