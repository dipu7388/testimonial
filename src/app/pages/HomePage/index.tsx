import * as React from 'react';
import { Jumbotron } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import { useEffect } from 'react';
import '../../app.scss';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

function getRandomInt(max) {
  console.log(max);

  return Math.floor(Math.random() * Math.floor(max));
}
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function HomePage() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [cid, setCid] = useState(useQuery().get('country') || 1);

  useEffect(() => {
    fetch('https://6027a0eddd4afd001754a8de.mockapi.io/api/testimonial')
      .then(res => res.json())
      .then(
        result => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          setIsLoaded(true);
          setError(error);
        },
      );
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Helmet>
          <title>Home Page</title>
          <meta
            name="description"
            content="A Boilerplate application homepage"
          />
        </Helmet>
        <Card>
          <Jumbotron>
            <h1 style={{ textAlign: 'center' }}>Testimonials</h1>
            <div className="wrapper">
              {items
                .filter((e: any) => (e.countryId % 2) + 1 == cid)
                .map((testi: any) => (
                  <Card
                    style={{
                      width: '18rem',
                      minHeight: '315px',
                      marginBottom: '24px',
                    }}
                    key={testi?.countryId + testi?.name}
                  >
                    <Card.Img
                      variant="top"
                      src={testi?.image}
                      style={{ height: '214px' }}
                    />
                    <Card.Body>
                      <Card.Title>{testi?.name}</Card.Title>
                      <Card.Text>{testi?.testimonial}</Card.Text>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          </Jumbotron>
        </Card>
      </>
    );
  }
}
