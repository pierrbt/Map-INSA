import type { SearchableBuilding } from "../map/buildings3d";

interface SearchOptions {
  input: HTMLInputElement;
  suggestions: HTMLUListElement;
  searchableBuildings: SearchableBuilding[];
  onSelect: (buildingName: string) => void;
}

export function setupSearch(options: SearchOptions): void {
  const { input, suggestions, searchableBuildings, onSelect } = options;
  let currentMatches: SearchableBuilding[] = [];

  const hideSuggestions = () => {
    currentMatches = [];
    suggestions.style.display = "none";
    suggestions.innerHTML = "";
  };

  const renderSuggestions = (matches: SearchableBuilding[]) => {
    currentMatches = matches;
    suggestions.innerHTML = "";

    if (matches.length === 0) {
      suggestions.style.display = "none";
      return;
    }

    for (const match of matches) {
      const item = document.createElement("li");
      item.textContent = match.name;

      item.addEventListener("click", () => {
        input.value = match.name;
        hideSuggestions();
        onSelect(match.name);
      });

      suggestions.appendChild(item);
    }

    suggestions.style.display = "block";
  };

  input.addEventListener("input", (event) => {
    const query = ((event.target as HTMLInputElement).value || "").trim();

    if (query.length < 2) {
      hideSuggestions();
      return;
    }

    const normalizedQuery = query.toLowerCase();
    const matches = searchableBuildings.filter((building) => {
      const inName = building.name.toLowerCase().includes(normalizedQuery);
      const inShortName = (building.shortName || "")
        .toLowerCase()
        .includes(normalizedQuery);
      return inName || inShortName;
    });

    renderSuggestions(matches);
  });

  input.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
      return;
    }

    if (currentMatches.length === 0) {
      return;
    }

    event.preventDefault();
    const selected = currentMatches[0];
    input.value = selected.name;
    hideSuggestions();
    onSelect(selected.name);
  });

  input.addEventListener("blur", () => {
    window.setTimeout(hideSuggestions, 100);
  });
}
