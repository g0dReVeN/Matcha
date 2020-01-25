import React from 'react';
import { Row } from 'simple-flexbox';
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from 'mdbreact';
import ProfileCardComponent from './ProfileCardComponent';

// const styles = StyleSheet.create({
//     container: {
//         width: 350,
//         //paddingTop: 32,
//         borderRight: '1px solid #e0e4e9'
//     },
//     menuItemList: {
//         marginTop: 52
//     },
//     separator: {
//         borderTop: '1px solid #DFE0EB',
//         marginTop: 16,
//         marginBottom: 16,
//         opacity: 0.06
//     }
// });

const MainContentComponent = () => {
    return (
        // <Row>
        //     <MDBCarousel
        //     activeItem={1}
        //     length={3}
        //     showControls={true}
        //     showIndicators={false}
        //     className="z-depth-1"
        //     >
        //         <MDBCarouselInner>
        //             <MDBCarouselItem itemId="1">
        //                 <ProfileCardComponent></ProfileCardComponent>
        //             </MDBCarouselItem>
        //             <MDBCarouselItem itemId="2">
        //                 <ProfileCardComponent></ProfileCardComponent>
        //             </MDBCarouselItem>
        //         </MDBCarouselInner>
        //     </MDBCarousel>
        // </Row>
        <MDBContainer>
      <MDBCarousel
        activeItem={1}
        length={3}
        showControls={true}
        showIndicators={true}
        className="z-depth-1"
        slide
      >
        <MDBCarouselInner>
          <MDBCarouselItem itemId="1">
            <MDBView>
              <img
                className="d-block w-100"
                src="https://mdbootstrap.com/img/Photos/Slides/img%20(45).jpg"
                alt="First slide"
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="2">
            <MDBView>
              <img
                className="d-block w-100"
                src="https://mdbootstrap.com/img/Photos/Slides/img%20(46).jpg"
                alt="Second slide"
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="3">
            <MDBView>
              <img
                className="d-block w-100"
                src="https://mdbootstrap.com/img/Photos/Slides/img%20(47).jpg"
                alt="Third slide"
              />
            </MDBView>
          </MDBCarouselItem>
        </MDBCarouselInner>
      </MDBCarousel>
    </MDBContainer>
      );
};

export default MainContentComponent;