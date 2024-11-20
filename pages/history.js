import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { ListGroup, Button } from "react-bootstrap";
import { useRouter } from "next/router";

export default function History() {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  // Parse the search history
  const parsedHistory = searchHistory.map((h) => {
    const params = new URLSearchParams(h);
    return Object.fromEntries(params.entries());
  });

  const historyClicked = (e, index) => {
    e.preventDefault();
    // get query string from the searchHistory atom index
    router.push(`/artwork?${searchHistory[index]}`);
  };

  const removeHistoryClicked = (e, index) => {
    e.stopPropagation();
    setSearchHistory((current) => {
      let newHistory = [...current];
      newHistory.splice(index, 1);
      return newHistory;
    });
  };

  return (
    <div>
      <h1 className="my-4">Search History</h1>
      <ListGroup>
        {parsedHistory.length === 0 ? (
          <div className="card p-3">
            Nothing Here. Try searching for some artwork.
          </div>
        ) : (
          parsedHistory.map((historyItem, index) => (
            <ListGroup.Item
              key={index}
              className="historyListItem"
              onClick={(e) => historyClicked(e, index)}
            >
              {Object.keys(historyItem).map((key) => (
                <span key={key}>
                  {key}: <strong>{historyItem[key]}</strong>&nbsp;
                </span>
              ))}
              <Button
                className="float-end"
                variant="danger"
                size="sm"
                onClick={(e) => removeHistoryClicked(e, index)}
              >
                &times;
              </Button>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </div>
  );
}
