import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import StyledHero from "../components/StyledHero"
import styles from "../css/template.module.css"
import Img from "gatsby-image"
import { FaMoneyBillWave, FaMap } from "react-icons/fa"
import Day from "../components/SingleTour/Day"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import SEO from "../components/SEO"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const Template = ({ data }) => {
  const {
    name,
    description: { description },
    images,
    link: { json },
  } = data.tour;

  const [mainImage, ...tourImages] = images;
  const options = {
    renderNode: {
      "embedded-asset-block": node => {
        return (
          <div className="rich">
            <h3>this is awesome image</h3>
            <a href={node.data.target.fields.file["en-US"].url}/>
            <p>images provided by john doe</p>
          </div>
        )
      },
      "embedded-entry-block": node => {
        const { name, images, link } = node.data.target.fields;
        console.log(link);

        return (
          <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <h1>this is other post : {name["en-US"]}</h1>
            <Img
              width="400"
              src={images["en-US"].fields.file["en-US"].url}
              alt=""
            />
            {documentToReactComponents(link["en-US"])}
            <br/>
            <br/>
            <br/>
            <br/>
          </div>
        )
      },
    },
  };
  return (
    <Layout>
      <SEO title={name}/>
      <StyledHero img={mainImage.fluid}/>
      <section className={styles.template}>
        <div className={styles.center}>
          <div className={styles.images}>
            {tourImages.map((item, index) => {
              return (
                <Img
                  key={index}
                  fluid={item.fluid}
                  alt="single tour"
                  className={styles.image}
                />)
              }
              )
            }
          </div>
          <h2>{name}</h2>
          <p className={styles.desc}>{description}</p>
          <article className={styles.desc}>
            {documentToReactComponents(json, options)}
          </article>
          <AniLink fade to="/tours" className="btn-primary">
            back to projects
          </AniLink>
        </div>
      </section>
    </Layout>

  )

};

export const query = graphql`
    query($slug: String!) {
        tour: contentfulTour(slug: { eq: $slug }) {
            name

            description {
                description
            }
           link{
               json
            }
            images {
                fluid {
                    ...GatsbyContentfulFluid
                }
            }
        }
    }
`;

export default Template