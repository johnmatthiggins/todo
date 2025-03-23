import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Login from './Login.tsx';
import TodoList from './TodoList.tsx';
import UpcomingTodoList from './UpcomingTodoList.tsx';
import NewTodoForm from './NewTodoForm.tsx';
import Home from './Home.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/accounts/login/" element={<Login />} />
        <Route path="/todo/" element={<TodoList />} />
        <Route path="/todo/new/" element={<NewTodoForm />} />
        <Route path="/upcoming/" element={<UpcomingTodoList />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
