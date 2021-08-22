import TextEditor from './TextEditor';
import './Colaborate.css'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import HomeScreen from './HomeScreen';

function Colaborate() {
  const [docId, setDocId] = useState('');
  return (
    <Router>
      <Switch>
        <Route exact path="/colaborate">
          <div className='app'>
              <HomeScreen docId={docId} setDocId={setDocId} />
          </div>
        </Route>
        <Route exact path="/rooms">
          <Redirect to={`/rooms/documents/${uuidV4()}`} />
        </Route>
        <Route path="/rooms/documents/:id">
          <TextEditor />
        </Route>
      </Switch>
    </Router>
  );
}

export default Colaborate;
