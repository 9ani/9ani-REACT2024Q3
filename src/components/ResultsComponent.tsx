import  { Component } from 'react';

interface Props {
  results: { name: string; description: string }[];
}

class ResultsComponent extends Component<Props> {
  render() {
    return (
      <div>
        {this.props.results.map((result, index) => (
          <div key={index}>
            <h3>{result.name}</h3>
            <p>{result.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default ResultsComponent;
