import React, { Component } from 'react';

interface Props {
  onSearch: (term: string) => void;
}

interface State {
  searchTerm: string;
}

class SearchComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { searchTerm: '' };
  }

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      this.setState({ searchTerm: savedSearchTerm });
    }
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    const trimmedTerm = this.state.searchTerm.trim();
    this.props.onSearch(trimmedTerm);
    localStorage.setItem('searchTerm', trimmedTerm);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default SearchComponent;
