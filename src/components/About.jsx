import React from 'react';

const About = () => (
  <section className="card" aria-labelledby="about-title">
    <h2 id="about-title" style={{ marginTop: 0 }}>About</h2>
    <div className="about-content">
      <div>
        <p>
          I'm a visual artist by training, but I'm a coder by trade.<br/>
          I got my start in code with Myspace layouts. These days, I spend an obscene amount of time talking to AI at work.<br/>
          Outside of work, I've been learning music production for a few years. Before, that, I was making rough demos.<br/>
          Sometimes I paint. I write poetry. In the past, I made installation sculptures and did performance art.
        </p>
        <p>
          I love to learn about:
          <ul>
            <li>Audio Synthesis</li>
            <li>Music composition</li>
            <li>Tarot</li>
            <li>Somatic practices</li>
            <li>The basic electrical components that make up synths</li>
            <li>Generative video and audio</li>
            <li>Ceramics</li>
          </ul>
        </p>
      </div>
      <img src="assets/noddles.jpg" alt="studio noddles" className="about-image" />
    </div>
  </section>
);

export default About;