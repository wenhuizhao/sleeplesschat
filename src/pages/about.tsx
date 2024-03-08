import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const About = () => (
  <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
    <p>
      <span className="font-bold">Welcome to InsomniaSpace.com</span>, your
      dedicated companion in navigating the challenges of insomnia. Our mission
      is to empower individuals experiencing sleep difficulties with accessible,
      supportive, and informative guidance.
    </p>

    <h2>Our Approach</h2>
    <p>
      At the heart of InsomniaSpace.com is our innovative AI-powered chatbot,
      designed with empathy and understanding of sleep-related issues. Drawing
      on a broad knowledge base about sleep health and insomnia, our chatbot
      aims to offer personalized tips and practices to help you achieve a more
      restful night&apos;s sleep.
    </p>

    <h2>Why Trust Us?</h2>
    <ul className="list-disc">
      <li>
        <span className="font-bold">Expertise and Empathy: </span>
        Our chatbot&apos;s responses are crafted from extensive research and
        insights into sleep science, offering informed suggestions that cater to
        your unique needs.
      </li>
      <li>
        <span className="font-bold">Privacy and Security: </span>
        We prioritize your privacy and the security of your information.
        Engaging with our chatbot is confidential, allowing you to seek guidance
        comfortably and securely.
      </li>
      <li>
        <span className="font-bold">Complementary Support: </span>
        Recognizing the complexity of sleep disorders, our service is designed
        to complement professional advice, not replace it. We encourage users to
        consult healthcare professionals for persistent insomnia issues.
      </li>
    </ul>
    <h2>Limitations</h2>
    <p>
      While our AI chatbot is a powerful tool in your journey to better sleep,
      it&apos;s important to note that it does not replace professional medical
      advice. Our platform serves as an additional resource, offering general
      support and information. Should your sleep concerns persist, or if you
      experience significant distress, seeking professional medical assistance
      is crucial.
    </p>

    <h2>Your Journey to Better Sleep</h2>
    <p>
      InsomniaSpace.com is more than just a website; it&apos;s a community
      committed to improving sleep health. Whether you&apos;re taking the first
      steps to address your sleep issues or looking for new strategies to
      enhance your sleep quality, we&apos;re here to support you every night.
    </p>

    <p>
      Explore our resources, interact with our AI chatbot, and discover how you
      can transform your sleep patterns and overall well-being. Let&apos;s
      embark on this journey together.
    </p>
  </Main>
);

export default About;
