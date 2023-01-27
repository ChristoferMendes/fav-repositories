import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash, FaSlash } from 'react-icons/fa'

import { Container, Form, SubmitButton, List, DeleteButton } from './styles'
import { api } from '../../services/api';
import { Link } from 'react-router-dom';
import { RenderHearts } from '../../components/RenderHearts';
import { IconBase } from 'react-icons';

interface RepositoriesState {
  data: {
    name: string;
    url: string;
  }
}

interface Repository {
  full_name: string;
  html_url: string;
}

enum Names  {
  Owner = 'owner',
  Name = 'name'
}


export const Main = () => {
  const [repo, setRepo] = useState({
    owner: '', name: ''
  })
  const { name, owner } = repo
  const [repositories, setRepositories] = useState<RepositoriesState[]>([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const repoStorage = localStorage.getItem('repos');

    if (repoStorage) {
      setRepositories(JSON.parse(repoStorage) || [])
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('repos', JSON.stringify(repositories))
  }, [repositories])

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();

    const submit = async () => {
      setLoading(true);
      setAlert(false);
            
      try {
        if (name === '' || owner === '') {
          throw new Error('You need to type a repository')
        }

        const requestUrl = `repos/${owner}/${name}`
        const { data } = await api.get<Repository>(requestUrl);

        const fullName = `${repo.owner}/${repo.name}`
        const findRepo = ({ data }: RepositoriesState) => data.name.toUpperCase().match(fullName.toUpperCase())
        const hasRepo = repositories.find(findRepo)

        if (hasRepo) {
          throw new Error('Repository duplicated')
        }


        const repository = { name: data.full_name, url: data.html_url }

        const addNewRepository = (prev: RepositoriesState[]) => [...prev, { data: repository }]

        setRepositories(addNewRepository)
        setRepo({ name: '', owner: '' })
      } catch {
        setAlert(true);
      } finally {
        setLoading(false);
      }
    }

    submit();


  }, [repo, repositories]);



  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRepo(prev => ({ ...prev, [name]: value }))
    setAlert(false);
  }

  const handleDelete = useCallback((repo: string) => {
    const filteredRepositories = repositories.filter(r => r.data.name !== repo);
    setRepositories(filteredRepositories);
  }, [repositories])


  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        My Repos
      </h1>

      <Form onSubmit={handleSubmit} error={alert}>
        <input type='text' name={Names.Owner} placeholder='Owner name' value={repo.owner} onChange={handleInputChange}></input>
        <input type="text" name={Names.Name} placeholder='Repository name' onChange={handleInputChange} value={repo.name} />
        <SubmitButton loading={loading}>
          {loading ? (
            <FaSpinner color={'#fff'} size={14} />
          ) : (
            <FaPlus color={'#fff'} size={14} />
          )}
        </SubmitButton>
      </Form>

      <List>
        {repositories.map((repo) => (
          <li key={repo.data.url}>
            <span>
              <DeleteButton onClick={() => handleDelete(repo.data.name)}>
                <FaTrash size={14} />
              </DeleteButton>
              <a href={repo.data.url}>{repo.data.name}</a>
            </span>
            <Link to={`repository/${encodeURIComponent(repo.data.name)}`}>
              <FaBars size={20} />
            </Link>
          </li>
        ))}

      </List>
    </Container>
  )
}