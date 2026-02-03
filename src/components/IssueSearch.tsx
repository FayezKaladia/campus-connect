import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface IssueSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function IssueSearch({ searchQuery, onSearchChange }: IssueSearchProps) {
  const [inputValue, setInputValue] = useState(searchQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(inputValue.trim().toUpperCase());
  };

  const handleClear = () => {
    setInputValue('');
    onSearchChange('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <div className="relative flex-1 max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by ID (e.g., OV-001001)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="pl-9 h-9 font-mono"
        />
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <Button type="submit" size="sm" variant="secondary">
        Search
      </Button>
    </form>
  );
}
