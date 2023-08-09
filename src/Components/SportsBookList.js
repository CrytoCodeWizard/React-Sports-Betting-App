import { List, ListItem, Card } from "@material-tailwind/react";
import {bookmaker_links, bookmaker_names, state_bookmakers} from '../Resources.js';
 
export default function SportsBookList() {
  return (
    <Card>
      <List>
        {Array.from(state_bookmakers["All"]).map((name) => {
            return <div data-testid="sportsbook" key={name}><a href={bookmaker_links[name]} target="_blank" rel="noopener noreferrer">
            <ListItem className="h-8 text-blue-500 text-sm">{bookmaker_names[name]}</ListItem></a></div>;
        })}
      </List>
    </Card>
  );
}