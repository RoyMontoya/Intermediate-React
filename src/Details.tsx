import React from "react";
import pf, { PetResponse, PetMedia } from "petfinder-client";
import { navigate, RouteComponentProps } from "@reach/router";
import Carousel from "./Carousel";
import Modal from "./Modal";
import Loadable from 'react-loadable';

if(!process.env.API_KEY || !process.env.API_SECRET) {
  throw new Error("no secret or api key")
}


const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});


const loading = () => <h1>...Loading Content</h1>

const LoadableContent = Loadable({
  loader: () => import('./AdoptModelContent'),
  loading
});

class Details extends React.Component<RouteComponentProps<{id: string}>> {
  public state = { loading: true, showModal: false };
  public componentDidMount() {
   if(!this.props.id){
    return
   }
   petfinder.pet
   .get({
     output: "full",
     id: this.props.id
   })
   .then(data => {
     if(!data.petfinder.pet){
       navigate("/");
       return
     }
     let breed;
     if (Array.isArray(data.petfinder.pet.breeds.breed)) {
       breed = data.petfinder.pet.breeds.breed.join(", ");
     } else {
       breed = data.petfinder.pet.breeds.breed;
     }
     this.setState({
       name: data.petfinder.pet.name,
       animal: data.petfinder.pet.animal,
       location: `${data.petfinder.pet.contact.city}, ${
         data.petfinder.pet.contact.state
       }`,
       description: data.petfinder.pet.description,
       media: data.petfinder.pet.media,
       breed,
       loading: false
     });
   })
   .catch(() => {
     navigate("/");
   });
  }
  public toggleModal = () => this.setState({ showModal: !this.state.showModal });
  public render() {
    if (this.state.loading) {
      return <h1>loading … </h1>;
    }

    const {
      media,
      animal,
      breed,
      location,
      description,
      name,
      showModal
    } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${location}`}</h2>
          <button onClick={this.toggleModal}>Adopt {name}</button>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <LoadableContent toggleModal= {this.toggleModal} name={name}  />
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Details;
