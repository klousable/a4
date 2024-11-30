import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { ListGroup, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { removeHistory } from "@/lib/userData"; // Import removeHistory function

export default function History() {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  if (!searchHistory) return null;

  const parsedHistory = searchHistory.map((h) => {
    const params = new URLSearchParams(h);
    return Object.fromEntries(params.entries());
  });

  const historyClicked = (e, index) => {
    e.preventDefault();
    router.push(`/artwork?${searchHistory[index]}`);
  };

  const removeHistoryClicked = async (e, index) => {
    e.stopPropagation();

    try {
      await removeHistory(searchHistory[index]);
      setSearchHistory((current) => {
        let newHistory = [...current];
        newHistory.splice(index, 1);
        return newHistory;
      });
    } catch (err) {
      console.error("Error removing history:", err);
    }
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
