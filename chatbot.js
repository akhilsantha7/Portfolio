/* ==========================================================
   Portfolio assistant — scripted, runs fully in the browser.
   No API keys, no backend, nothing sent anywhere.

   To update answers: edit KB (topics) and SKILLS below.
   Each topic has keywords; the topic with the highest
   keyword score wins. Answers are trusted HTML you write.
   ========================================================== */
(function () {
  "use strict";

  var EMAIL = "akhilsantha7@gmail.com";
  var LINKEDIN = "https://linkedin.com/in/akhilsantha";
  var GITHUB = "https://github.com/akhilsantha7";
  var RESUME = "Akhil_Resume.pdf";

  // Helpers for writing answers
  function sec(id, label) { return '<a href="#' + id + '" data-asb-nav>' + label + "</a>"; }
  function openEl(selector, label) {
    return '<a href="#" data-asb-click="' + selector.replace(/"/g, "&quot;") + '">' + label + "</a>";
  }
  function ext(url, label) { return '<a href="' + url + '" target="_blank" rel="noopener">' + label + "</a>"; }
  function proj(sheet, label) { return openEl("[data-project-sheet='" + sheet + "']", label || "Open project details"); }
  function pub(id, label) { return openEl(".pub-card[data-pub='" + id + "']", label || "Open publication"); }
  var MAIL = '<a href="mailto:' + EMAIL + '">' + EMAIL + "</a>";

  /* ---------------------------------------------------------
     Topics. kw: "phrase" (weight 1) or ["phrase", weight].
     --------------------------------------------------------- */
  var KB = [
    {
      id: "greeting",
      kw: [["hi", 0.5], ["hello", 0.5], ["hey", 0.5], ["hiya", 0.5], ["good morning", 0.5], ["good afternoon", 0.5], ["good evening", 0.5], ["yo", 0.4], ["sup", 0.4]],
      a: "<p>Hi! I can answer quick questions about Akhil: his experience, projects, skills, education and how to reach him. What would you like to know?</p>",
      chips: ["Who is Akhil?", "Current role", "Featured project", "Contact"]
    },
    {
      id: "summary",
      kw: ["who is", "who are you", "tell me about", "about akhil", "about him", "about yourself", "introduce", "summary", "overview", "background", "bio", "elevator pitch", "what does he do", "what do you do", ["akhil", 0.5]],
      a: "<p><strong>Akhil Santha</strong> is a Senior Machine Learning Engineer at CVS Health with 5+ years of experience building ML and AI systems end-to-end, from research and training to production deployment.</p>" +
         "<p>He has shipped models in healthcare, finance, child safety and computer vision products, across cloud, mobile and edge. He's based in McKinney, Texas.</p>" +
         "<p>More in " + sec("about", "About") + ".</p>",
      chips: ["Work experience", "Skills", "Projects", "Is he open to roles?"]
    },
    {
      id: "experience",
      kw: ["experience", "work history", "worked", "jobs", "job", "career", "companies", "employers", "where has he worked", "where have you worked", "roles", "positions", "how many years", "years of experience", "how long", "work"],
      a: "<p>Akhil has <strong>5+ years</strong> of ML engineering experience:</p><ul>" +
         "<li><strong>CVS Health</strong>, Senior ML Engineer (Jun 2025 – present)</li>" +
         "<li><strong>Fannie Mae</strong>, ML Engineer II (Jun 2023 – Jun 2025)</li>" +
         "<li><strong>Smith Micro Software</strong>, ML Engineer (Jun 2021 – Apr 2023)</li>" +
         "<li><strong>Boston Scientific</strong>, Algorithm Engineer – ML (Nov 2020 – Jun 2021)</li>" +
         "<li><strong>Kodak Alaris</strong>, ML Intern (Feb – Dec 2019)</li>" +
         "<li><strong>Visual DX</strong>, ML Intern (Aug – Dec 2018)</li></ul>" +
         "<p>Ask about any of them, or see " + sec("experience", "Experience") + ".</p>",
      chips: ["CVS", "Fannie Mae", "Smith Micro", "Boston Scientific"]
    },
    {
      id: "cvs",
      kw: [["cvs", 3], ["cvs health", 3], ["work now", 3], ["working now", 3], ["working on now", 3], ["current role", 2], ["current job", 2], ["currently", 1.5], ["right now", 1.5], ["now", 1], ["present", 1], ["latest", 1], ["sku", 2], ["assortment", 2], ["retail", 1.5]],
      a: "<p>Akhil is a <strong>Senior Machine Learning Engineer at CVS Health</strong> (Texas, since June 2025). He:</p><ul>" +
         "<li>Builds ML models for SKU assortment from historical sales and transaction data</li>" +
         "<li>Uses deep learning and GenAI / prompt engineering to generate product embeddings and structured attributes from unstructured descriptions</li>" +
         "<li>Designs MLOps pipelines on Kubernetes for scalable, monitored production deployment</li>" +
         "<li>Leads a team building maintainable ML pipelines</li></ul>" +
         "<p>Stack: Python, TensorFlow, PyTorch, SQL, Azure, Kubernetes, Docker, Jenkins, GitHub Actions, Snowflake.</p>",
      chips: ["Fannie Mae", "MLOps experience", "GenAI / LLM experience"]
    },
    {
      id: "fanniemae",
      kw: [["fannie mae", 3], ["fannie", 3], ["finance", 2], ["financial", 2], ["fintech", 2], ["bank", 1], ["anomaly detection", 1.5]],
      a: "<p>At <strong>Fannie Mae</strong> (ML Engineer II, Jun 2023 – Jun 2025) Akhil:</p><ul>" +
         "<li>Led deep learning models for financial data analysis: anomaly detection and pattern recognition</li>" +
         "<li>Built and optimized LLMs with <strong>AWS Bedrock</strong>, plus Isolation Forest, Random Cut Forest, LSTM autoencoders and Prophet</li>" +
         "<li>Built end-to-end MLOps on <strong>AWS SageMaker</strong> (training, deployment, monitoring)</li>" +
         "<li>Developed high-performance Flask prediction APIs using parallel computing</li>" +
         "<li>Led data engineering with AWS Glue, cutting processing time by 20%</li></ul>",
      chips: ["Smith Micro", "AWS experience", "LLM experience"]
    },
    {
      id: "smithmicro",
      kw: [["smith micro", 3], ["smith", 2], ["parental control", 3], ["child safety", 3], ["bullying", 3], ["profanity", 3], ["trust and safety", 2], ["mac address", 3]],
      a: "<p>At <strong>Smith Micro Software</strong> (ML Engineer, Jun 2021 – Apr 2023) Akhil:</p><ul>" +
         "<li>Led sequence-to-sequence models (LSTMs, Transformers) for parental-control systems, reaching <strong>99% accuracy</strong> in bullying and profanity classification</li>" +
         "<li>Built a BERT-based MAC address classifier integrated into iOS apps</li>" +
         "<li>Quantized models to 8-bit (<strong>75% smaller</strong>, over 95% of baseline accuracy kept) and deployed them on iOS with Core ML</li>" +
         "<li>Led a location anomaly detection initiative and built edge-optimized action recognition models</li></ul>",
      chips: ["Edge / iOS ML", "NLP experience", "Boston Scientific"]
    },
    {
      id: "bostonsci",
      kw: [["boston scientific", 3], ["boston", 2], ["ivus", 3], ["stent", 3], ["dicom", 3], ["medical", 2], ["healthcare", 1.5], ["medicine", 2], ["medical imaging", 3], ["u net", 2], ["unet", 2], ["segmentation", 1.5]],
      a: "<p>At <strong>Boston Scientific</strong> (Algorithm Engineer – ML, Nov 2020 – Jun 2021) Akhil worked on medical imaging:</p><ul>" +
         "<li>Classification models on DICOM IVUS (intravascular ultrasound) images to identify stent regions</li>" +
         "<li>Segmentation models to detect stent and calcium regions, including 2D and 3D U-Net research</li>" +
         "<li>Distributed multi-GPU training in PyTorch to speed up training on large datasets</li>" +
         "<li>Quantization for efficient deployment on medical devices at clinical-grade accuracy</li></ul>",
      chips: ["Kodak Alaris", "Computer vision experience", "Visual DX"]
    },
    {
      id: "kodak",
      kw: [["kodak", 3], ["kodak alaris", 3], ["alaris", 3], ["kiosk", 3], ["point cloud", 3], ["tensorrt", 2]],
      a: "<p>At <strong>Kodak Alaris</strong> (ML Intern, Feb – Dec 2019) Akhil:</p><ul>" +
         "<li>Trained face and eyeglass detection models in TensorFlow, <strong>98% accuracy</strong> on eyeglass classification (fine-tuned Inception ResNet v1)</li>" +
         "<li>Quantized models with TensorRT to 8-bit, 75% smaller with the same performance</li>" +
         "<li>Deployed face, eyeglass and landmark detection into kiosk systems with OpenCV and DLib</li>" +
         "<li>Built 3D point cloud classification and segmentation with PCL and Open3D</li></ul>",
      chips: ["Visual DX", "Eye-glass detection project"]
    },
    {
      id: "visualdx",
      kw: [["visual dx", 3], ["visualdx", 3], ["skin lesion", 3], ["dermatology", 3]],
      a: "<p>At <strong>Visual DX</strong> (ML Intern, Aug – Dec 2018) Akhil built skin lesion classification models that <strong>beat state-of-the-art benchmarks by 2%</strong> on public datasets. He made them robust to skin tone, lighting and lesion variation, and used image processing (edge detection, morphological operations, color normalization) to improve accuracy.</p>",
      chips: ["Skin disease project", "Education"]
    },
    {
      id: "education",
      kw: ["education", "degree", "degrees", "university", "college", "school", "study", "studied", "masters", "master", "bachelors", "bachelor", "graduate", "graduated", "academic", ["rit", 2], ["rochester", 2], ["osmania", 2], "ms", "bs", "gpa", "grades", "courses", "coursework"],
      a: "<ul><li><strong>M.S. in Computer Engineering</strong>, Rochester Institute of Technology (Jan 2018 – May 2020). GPA 3.7/4.0. Specialization in ML, deep learning and computer vision.</li>" +
         "<li><strong>B.S. in Electronics and Communications Engineering</strong>, University College of Engineering, Osmania University, India (2013 – 2017)</li></ul>" +
         "<p>Coursework included Machine Learning, Deep Learning, Computer Vision, Data Science, Statistics and Brain-Inspired Computing. See " + sec("education", "Education") + ".</p>",
      chips: ["Thesis", "Publications", "Research"]
    },
    {
      id: "research",
      kw: [["thesis", 3], ["research", 2], ["lab", 1.5], ["supervisor", 2], ["advisor", 2], ["ptucha", 3], ["gan", 1.5], ["gans", 1.5], ["deepfake", 3], ["deepfakes", 3], ["deep fake", 3]],
      a: "<p>Akhil's master's thesis at RIT was <strong>Deepfakes Generation using GANs</strong>: using deep neural networks to generate manipulated faces in images and video. He was supervised by Prof. Dr. Ptucha.</p>" +
         "<p>In the research lab he also worked on sign language translation and the evolution of graph CNNs. " + pub("deepfakes", "Thesis details") + "</p>",
      chips: ["Publications", "Sign language project"]
    },
    {
      id: "publications",
      kw: [["publication", 3], ["publications", 3], ["paper", 3], ["papers", 3], ["published", 3], ["acm", 3], ["journal", 2], ["scholarly", 3], ["article", 2]],
      a: "<ul><li><strong>Deep Learning Methods for Sign Language Translation</strong> (ACM). A look at deep learning architectures for sign language translation and recognition. " + ext("https://dl.acm.org/doi/10.1145/3477498", "Read on ACM") + "</li>" +
         "<li><strong>Deepfakes Generation using GANs</strong> (M.S. thesis, RIT). GANs for face manipulation in images and video.</li></ul>" +
         "<p>See " + sec("publications", "Publications") + ".</p>",
      chips: ["Thesis", "Projects"]
    },
    {
      id: "projects",
      kw: [["project", 2], ["projects", 2], "portfolio", "built", "side project", "side projects", "personal projects", "what has he built", "what have you built", "github repos", "repos", "demo", "showcase"],
      a: "<p>Akhil's projects:</p><ul>" +
         "<li><strong>DHARAMIND</strong> (featured): iOS smart-agriculture app for irrigation timing and plant disease detection</li>" +
         "<li><strong>Soil moisture & plant disease detection</strong> (SoilQ)</li>" +
         "<li><strong>Evolution of graph classifiers</strong></li>" +
         "<li><strong>Fruit & ripeness detection</strong> with YOLO</li>" +
         "<li><strong>Face mask detection</strong></li>" +
         "<li><strong>Facial understanding & eyeglass detection</strong></li>" +
         "<li><strong>Sign language recognition</strong></li>" +
         "<li><strong>Skin disease classification</strong></li></ul>" +
         "<p>See " + sec("projects", "Projects") + " or " + ext(GITHUB, "GitHub") + ".</p>",
      chips: ["Featured project", "Sign language project", "YOLO project"]
    },
    {
      id: "dharamind",
      kw: [["dharamind", 4], ["featured", 2], ["featured project", 3], ["ios app", 3], ["app", 1], ["agriculture", 2], ["agritech", 3], ["farmers", 3], ["farming", 3], ["irrigation", 3], ["mobile app", 2]],
      a: "<p><strong>DHARAMIND</strong> is Akhil's featured project: a smart-agriculture iOS app that helps farmers decide <strong>when to irrigate</strong> and <strong>detect plant disease</strong>. It combines on-device ML with cloud-based GenAI.</p>" +
         "<p>" + proj("dharamind-sheet", "See the architecture and demo") + "</p>",
      chips: ["SoilQ project", "Edge / iOS ML", "Other projects"]
    },
    {
      id: "soilq",
      kw: [["soilq", 4], ["soil", 3], ["moisture", 3], ["plant disease", 3], ["plant", 1.5], ["leaf", 2]],
      a: "<p><strong>Soil Moisture & Plant Disease Detection (SoilQ)</strong> predicts soil moisture for irrigation decisions and classifies plant disease from leaf images. It has a REST API in Python/Flask and Dockerized cloud deployment.</p>" +
         "<p>" + proj("soilq-sheet") + " · " + ext(GITHUB + "/SoilQ", "GitHub") + "</p>",
      chips: ["Featured project", "Other projects"]
    },
    {
      id: "tomato",
      kw: [["yolo", 3], ["tomato", 4], ["fruit", 3], ["ripeness", 4], ["object detection", 2]],
      a: "<p><strong>Fruit & Ripeness Detection</strong> uses YOLO to detect tomatoes and other fruit in images, then classifies ripeness stage from color and texture. Built as a modular Python/Jupyter pipeline.</p>" +
         "<p>" + proj("tomato-sheet") + " · " + ext(GITHUB + "/Tomato-detection", "GitHub") + "</p>",
      chips: ["Face mask project", "Computer vision experience"]
    },
    {
      id: "facemask",
      kw: [["face mask", 4], ["mask", 3], ["masks", 3], ["webcam", 2]],
      a: "<p><strong>Face Mask Detection</strong> is an end-to-end OpenCV pipeline: face detection plus a mask / no-mask classifier, running on images, video files or a live webcam.</p>" +
         "<p>" + proj("facemask-sheet") + " · " + ext(GITHUB + "/Face-Mask-Detection", "GitHub") + "</p>",
      chips: ["Eye-glass detection project", "Other projects"]
    },
    {
      id: "eyeglass",
      kw: [["eyeglass", 4], ["eye glass", 4], ["eye-glass", 4], ["glasses", 3], ["facial", 2], ["face detection", 3], ["landmark", 3], ["landmarks", 3], ["facial understanding", 4]],
      a: "<p><strong>Facial Understanding & Eye-Glass Detection</strong>: face and landmark detection modules in C++, plus a FaceNet-based eyeglass classifier with <strong>98.1% test accuracy</strong>. The model was frozen, optimized and quantized, then deployed with OpenCV in C++.</p>" +
         "<p>" + proj("facial-sheet") + " · " + ext(GITHUB + "/Eye-Glass-Detection", "GitHub") + "</p>",
      chips: ["Kodak Alaris", "Other projects"]
    },
    {
      id: "signlang",
      kw: [["sign language", 4], ["sign", 2], ["asl", 3], ["skeleton", 3], ["openpose", 4], ["st gcn", 4], ["stgcn", 4], ["action recognition", 2], ["gesture", 2]],
      a: "<p><strong>Sign Language Recognition</strong> uses skeleton-based action recognition: OpenPose keypoints go into spatial-temporal graph convolutions (ST-GCN style). It includes a custom data loader, training pipeline and vocabulary building for end-to-end recognition.</p>" +
         "<p>Akhil also published an ACM paper on deep learning for sign language translation. " + proj("signlang-sheet") + " · " + ext(GITHUB + "/Sign-Language-Recognition", "GitHub") + "</p>",
      chips: ["Publications", "Graph classifiers project"]
    },
    {
      id: "graph",
      kw: [["graph", 3], ["graphs", 3], ["gnn", 4], ["graph neural", 4], ["graphcnn", 4], ["graph cnn", 4], ["graph classifiers", 4]],
      a: "<p><strong>Evolution of Graph Classifiers</strong> is a deep learning project on graph neural networks, from Akhil's research lab work on the evolution of GraphCNNs at RIT. See " + sec("projects", "Projects") + " and " + ext(GITHUB, "GitHub") + ".</p>",
      chips: ["Sign language project", "Research"]
    },
    {
      id: "skindisease",
      kw: [["skin", 3], ["skin disease", 4], ["densenet", 3], ["resnet", 2], ["sd198", 4], ["ham", 3], ["ham10000", 4]],
      a: "<p><strong>Skin Disease Classification</strong> classifies skin disease from images in PyTorch, using DenseNet and ResNet backbones trained on the SD198 and HAM datasets, with configurable training and evaluation pipelines.</p>" +
         "<p>" + proj("skin-sheet") + " · " + ext(GITHUB + "/Skin-Disease-Classification", "GitHub") + "</p>",
      chips: ["Visual DX", "Other projects"]
    },
    {
      id: "skills",
      kw: [["skills", 3], ["skill", 3], ["tech stack", 3], ["stack", 2], ["technologies", 3], ["tools", 2], ["languages", 2], ["programming", 2], ["frameworks", 2], ["good at", 2], ["expertise", 2], ["strengths", 2], ["specialize", 2], ["specialization", 2]],
      a: "<ul><li><strong>Machine learning:</strong> deep learning, CNNs, RNNs/LSTMs, Transformers, BERT, GANs, graph CNNs, vision transformers, NLP, computer vision, LLMs, LangChain, LangGraph, RAG</li>" +
         "<li><strong>Languages & frameworks:</strong> Python, SQL, C++, Swift, R, MATLAB, TensorFlow, PyTorch, Keras, scikit-learn, Pandas, NumPy</li>" +
         "<li><strong>Cloud & MLOps:</strong> AWS (SageMaker, Bedrock, Glue, Lambda, S3), Azure, Kubernetes, Docker, Snowflake</li>" +
         "<li><strong>Practices:</strong> distributed training, quantization and edge deployment, CI/CD with GitHub Actions and Jenkins, Linux, Agile</li></ul>" +
         "<p>Ask about a specific tool, e.g. \"Does he know PyTorch?\" See " + sec("skills", "Skills") + ".</p>",
      chips: ["LLM experience", "MLOps experience", "Computer vision experience"]
    },
    {
      id: "hire",
      kw: [["hire", 3], ["hiring", 3], ["available", 3], ["availability", 3], ["open to", 3], ["opportunities", 3], ["opportunity", 3], ["looking for", 2], ["job search", 3], ["new role", 3], ["recruit", 3], ["recruiter", 3], ["relocate", 3], ["relocation", 3], ["remote", 2], ["freelance", 2], ["consulting", 2], ["interview", 2]],
      a: "<p>Yes, Akhil is <strong>open to new opportunities</strong>. He's based in McKinney, Texas.</p>" +
         "<p>The best way to start a conversation is email (" + MAIL + "), " + ext(LINKEDIN, "LinkedIn") + ", or the form in " + sec("contact", "Contact") + ". His resume is " + ext(RESUME, "here (PDF)") + ".</p>",
      chips: ["Resume", "Work experience", "Skills"]
    },
    {
      id: "location",
      kw: [["where", 1], ["location", 3], ["located", 3], ["based", 3], ["live", 2], ["lives", 2], ["city", 2], ["texas", 3], ["tx", 2], ["mckinney", 3], ["dallas", 2], ["time zone", 3], ["timezone", 3]],
      a: "<p>Akhil is based in <strong>McKinney, Texas</strong> (Dallas area, Central Time).</p>",
      chips: ["Is he open to roles?", "Contact"]
    },
    {
      id: "contact",
      kw: [["contact", 3], ["reach", 3], ["email", 3], ["mail", 2], ["get in touch", 3], ["message", 2], ["linkedin", 3], ["connect", 2], ["talk to", 2], ["phone", 2], ["call", 1.5]],
      a: "<ul><li>Email: " + MAIL + "</li>" +
         "<li>LinkedIn: " + ext(LINKEDIN, "linkedin.com/in/akhilsantha") + "</li>" +
         "<li>GitHub: " + ext(GITHUB, "github.com/akhilsantha7") + "</li></ul>" +
         "<p>Or send a message from " + sec("contact", "Contact") + ".</p>",
      chips: ["Resume", "Is he open to roles?"]
    },
    {
      id: "resume",
      kw: [["resume", 4], ["cv", 4], ["download", 2], ["pdf", 2]],
      a: "<p>Here's Akhil's resume: " + ext(RESUME, "Akhil_Resume.pdf") + ".</p>",
      chips: ["Work experience", "Contact"]
    },
    {
      id: "github",
      kw: [["github", 4], ["source code", 3], ["code", 1.5], ["repository", 3], ["repositories", 3]],
      a: "<p>Akhil's code is on " + ext(GITHUB, "github.com/akhilsantha7") + ". Each project in " + sec("projects", "Projects") + " links to its repo.</p>",
      chips: ["Projects", "Contact"]
    },
    {
      id: "hobbies",
      kw: [["hobby", 3], ["hobbies", 3], ["free time", 3], ["fun", 2], ["outside of work", 3], ["interests", 2], ["personal", 1.5], ["weekend", 2]],
      a: "<p>Outside work, Akhil is usually on a side project when an idea won't let go, reading or listening to something about ML, or spending time with family and friends.</p>",
      chips: ["Projects", "Who is Akhil?"]
    },
    {
      id: "thanks",
      kw: [["thanks", 2], ["thank you", 2], ["thx", 2], ["ty", 1.5], ["appreciate", 2], ["great", 0.5], ["cool", 0.5], ["awesome", 0.5], ["nice", 0.5]],
      a: "<p>You're welcome! Anything else you'd like to know?</p>",
      chips: ["Contact", "Resume"]
    },
    {
      id: "bye",
      kw: [["bye", 2], ["goodbye", 2], ["see you", 2], ["later", 1]],
      a: "<p>Thanks for stopping by! You can reach Akhil anytime at " + MAIL + ".</p>"
    },
    {
      id: "bot",
      kw: [["are you a bot", 4], ["are you ai", 4], ["are you real", 4], ["are you human", 4], ["chatgpt", 3], ["what are you", 3], ["how do you work", 3], ["who built you", 3], ["who made you", 3]],
      a: "<p>I'm a small scripted assistant on Akhil's portfolio. I match your question to answers he's prepared, so I don't use AI or send your messages anywhere. For anything I can't answer, email him at " + MAIL + ".</p>",
      chips: ["Who is Akhil?", "Contact"]
    }
  ];

  /* ---------------------------------------------------------
     Specific tools/skills → "Does he know X?"
     --------------------------------------------------------- */
  var SKILLS = [
    { t: ["python"], a: "Python is Akhil's main language, used in every role from Visual DX to CVS Health." },
    { t: ["pytorch", "torch"], a: "PyTorch: used at CVS Health and Smith Micro, for distributed multi-GPU training at Boston Scientific, and in the skin disease project." },
    { t: ["tensorflow", "tf"], a: "TensorFlow: used across nearly every role, including CVS, Fannie Mae, Smith Micro, Kodak Alaris and Visual DX." },
    { t: ["keras"], a: "Keras: used at Visual DX and listed in his frameworks." },
    { t: ["scikit learn", "sklearn", "scikit"], a: "scikit-learn: part of his data and analysis toolkit, alongside Pandas and NumPy." },
    { t: ["pandas", "numpy", "matplotlib"], a: "Pandas, NumPy and Matplotlib are part of his everyday data and analysis toolkit." },
    { t: ["sql"], a: "SQL: used at CVS Health, Fannie Mae and Smith Micro." },
    { t: ["snowflake"], a: "Snowflake: used at CVS Health." },
    { t: ["c++", "cpp", "c plus plus"], a: "C++: used for face and landmark detection modules and OpenCV deployment of the eyeglass model." },
    { t: ["swift"], a: "Swift: used for iOS work, including the DHARAMIND app and on-device models at Smith Micro." },
    { t: ["matlab"], a: "MATLAB: listed in his languages and frameworks." },
    { t: ["r language", "r programming"], a: "R: listed in his languages." },
    { t: ["aws", "amazon web services"], a: "AWS: SageMaker, Bedrock, Glue, Lambda and S3. He built end-to-end MLOps on SageMaker and LLM work on Bedrock at Fannie Mae, and ML services on AWS at Smith Micro." },
    { t: ["sagemaker"], a: "AWS SageMaker: he built end-to-end MLOps pipelines (training, deployment, monitoring) with it at Fannie Mae." },
    { t: ["bedrock"], a: "AWS Bedrock: he built and optimized LLMs with it at Fannie Mae." },
    { t: ["glue", "aws glue"], a: "AWS Glue: he led data engineering with it at Fannie Mae, cutting processing time by 20%." },
    { t: ["lambda", "s3"], a: "AWS Lambda and S3 are part of his AWS toolkit." },
    { t: ["azure"], a: "Azure: used at CVS Health." },
    { t: ["gcp", "google cloud"], n: 1, a: "His cloud work has been on AWS and Azure. GCP isn't listed on his portfolio, but the MLOps concepts carry over. Ask him directly at " + MAIL + "." },
    { t: ["kubernetes", "k8s"], a: "Kubernetes: he designs MLOps pipelines and low-latency, horizontally scalable model serving on Kubernetes at CVS Health." },
    { t: ["docker", "containers", "containerization"], a: "Docker: used at CVS Health and for deploying the SoilQ project." },
    { t: ["jenkins", "github actions", "ci cd", "cicd", "ci/cd"], a: "CI/CD: Jenkins and GitHub Actions at CVS Health." },
    { t: ["mlops", "deployment", "deploy", "production", "model serving", "serving"], a: "MLOps is a core strength: Kubernetes pipelines at CVS Health, end-to-end SageMaker pipelines at Fannie Mae, and shipping models to cloud, mobile, edge and medical devices." },
    { t: ["llm", "llms", "large language model", "large language models", "genai", "gen ai", "generative ai", "prompt engineering", "prompting"], a: "LLMs and GenAI: LLMs on AWS Bedrock at Fannie Mae, GenAI and prompt engineering for product embeddings and attributes at CVS Health, and cloud GenAI in the DHARAMIND app. He also lists LangChain, LangGraph and RAG." },
    { t: ["langchain", "langgraph", "rag", "retrieval augmented", "agents", "agentic"], a: "LangChain, LangGraph and RAG are in his ML skill set, alongside his LLM work on AWS Bedrock and GenAI at CVS Health." },
    { t: ["nlp", "natural language", "text classification"], a: "NLP: seq2seq models (LSTMs, Transformers) with 99% accuracy on bullying and profanity classification at Smith Micro, BERT-based classification, and LLM work at Fannie Mae and CVS." },
    { t: ["bert"], a: "BERT: he built a BERT-based MAC address classifier integrated into iOS apps at Smith Micro." },
    { t: ["transformer", "transformers", "vision transformer", "vit"], a: "Transformers: used for seq2seq NLP at Smith Micro. He also lists BERT and vision transformers." },
    { t: ["lstm", "lstms", "rnn", "rnns", "sequence models"], a: "LSTMs/RNNs: seq2seq models at Smith Micro, plus LSTM autoencoders for anomaly detection at Fannie Mae." },
    { t: ["cnn", "cnns", "convolutional"], a: "CNNs are central to his computer vision work: medical imaging, face and eyeglass detection, skin lesions and plant disease." },
    { t: ["computer vision", "cv models", "image processing", "opencv", "vision"], a: "Computer vision: IVUS medical imaging at Boston Scientific, face and eyeglass detection at Kodak Alaris, skin lesions at Visual DX, plus YOLO, face mask and plant disease projects. Tools include OpenCV, DLib, PCL and Open3D." },
    { t: ["yolo", "object detection", "detection"], a: "Object detection: YOLO for fruit and ripeness, face mask detection, and face and eyeglass detection at Kodak Alaris." },
    { t: ["segmentation", "u net", "unet"], a: "Segmentation: 2D and 3D U-Net for stent and calcium segmentation at Boston Scientific, plus 3D point cloud segmentation at Kodak Alaris." },
    { t: ["anomaly detection", "anomaly", "isolation forest", "time series", "forecasting", "prophet"], a: "Anomaly detection and time series: Isolation Forest, Random Cut Forest, LSTM autoencoders and Prophet at Fannie Mae, plus location anomaly detection at Smith Micro." },
    { t: ["recommendation", "recommender", "embeddings"], a: "Recommendations and embeddings: at CVS Health he generates product embeddings and structured attributes to support recommendation systems and analytics." },
    { t: ["quantization", "quantize", "edge", "on device", "on-device", "core ml", "coreml", "tensorrt", "mobile", "ios", "edge ml"], a: "Edge and on-device ML: 8-bit quantization (75% smaller models) with Core ML on iOS at Smith Micro, TensorRT at Kodak Alaris, quantized models for medical devices at Boston Scientific, and the DHARAMIND iOS app." },
    { t: ["distributed training", "multi gpu", "gpu", "gpus"], a: "Distributed training: multi-GPU PyTorch pipelines at Boston Scientific." },
    { t: ["gan", "gans", "generative adversarial"], a: "GANs: his M.S. thesis was Deepfakes Generation using GANs." },
    { t: ["gnn", "graph neural network", "graph cnn", "graphcnn"], a: "Graph neural networks: GraphCNN research at RIT, the graph classifiers project, and ST-GCN for sign language recognition." },
    { t: ["flask", "api", "apis", "rest"], a: "APIs: high-performance Flask prediction APIs at Fannie Mae and a Flask REST API for SoilQ." },
    { t: ["linux"], a: "Linux is part of his day-to-day tooling." },
    { t: ["agile", "jira", "scrum"], a: "He works in Agile teams with JIRA." },
    { t: ["leadership", "lead", "led", "manage", "mentor", "team lead"], a: "Leadership: he leads a team building ML pipelines at CVS Health, and led model development at Fannie Mae and Smith Micro (including the location anomaly detection initiative)." },
    { t: ["data engineering", "data pipelines", "etl", "pipelines"], a: "Data engineering: pipelines at CVS Health and AWS Glue at Fannie Mae (20% faster processing)." }
  ];

  /* ---------------------------------------------------------
     Matching
     --------------------------------------------------------- */
  function norm(s) {
    return " " + String(s).toLowerCase()
      .replace(/[’']/g, "")
      .replace(/c\+\+/g, "cpp")
      .replace(/ci\/cd/g, "cicd")
      .replace(/[^a-z0-9#]+/g, " ")
      .replace(/\s+/g, " ")
      .trim() + " ";
  }
  // Pre-normalize keywords once
  KB.forEach(function (topic) {
    topic._kw = topic.kw.map(function (k) {
      var p = Array.isArray(k) ? k[0] : k;
      var w = Array.isArray(k) ? k[1] : 1;
      return { p: norm(p), w: w };
    });
  });
  SKILLS.forEach(function (s) { s._t = s.t.map(norm); });

  // Labels used on chips → the exact topic they should open
  var CHIP_MAP = {
    "who is akhil?": "summary", "current role": "cvs", "featured project": "dharamind",
    "contact": "contact", "work experience": "experience", "skills": "skills", "projects": "projects",
    "other projects": "projects", "is he open to roles?": "hire", "resume": "resume",
    "education": "education", "thesis": "research", "publications": "publications", "research": "research",
    "cvs": "cvs", "fannie mae": "fanniemae", "smith micro": "smithmicro", "boston scientific": "bostonsci",
    "kodak alaris": "kodak", "visual dx": "visualdx", "soilq project": "soilq", "sign language project": "signlang",
    "yolo project": "tomato", "face mask project": "facemask", "eye-glass detection project": "eyeglass",
    "skin disease project": "skindisease", "graph classifiers project": "graph"
  };

  function byId(id) { for (var i = 0; i < KB.length; i++) if (KB[i].id === id) return KB[i]; return null; }

  function answer(q) {
    var key = q.trim().toLowerCase();
    if (CHIP_MAP[key]) { var t0 = byId(CHIP_MAP[key]); return { html: t0.a, chips: t0.chips }; }

    var text = norm(q);
    if (text.trim().length === 0) return null;

    // Score topics
    var best = null, bestScore = 0;
    KB.forEach(function (topic) {
      var s = 0;
      topic._kw.forEach(function (k) { if (text.indexOf(k.p) !== -1) s += k.w; });
      if (s > bestScore) { bestScore = s; best = topic; }
    });

    // Skill hits
    var hits = SKILLS.filter(function (s) {
      return s._t.some(function (t) { return text.indexOf(t) !== -1; });
    });

    var skillQuestion = /\b(know|knows|familiar|experience with|experienced|worked with|work with|use|used|uses|using|skilled|proficient|expert|does he|do you|can he|can you|has he|have you)\b/.test(text);

    // A very specific topic (company/project name) beats a skill hit;
    // otherwise, if they asked about a tool, answer with the skill(s).
    if (hits.length && (bestScore < 3 || (skillQuestion && bestScore < 4))) {
      var list = hits.slice(0, 3);
      var html = list.length === 1
        ? "<p>" + (list[0].n ? "" : "Yes. ") + list[0].a + "</p>"
        : "<p>Here's what I have:</p><ul>" + list.map(function (s) { return "<li>" + s.a + "</li>"; }).join("") + "</ul>";
      return { html: html, chips: ["Skills", "Work experience", "Projects"] };
    }

    if (best && bestScore >= 0.5) return { html: best.a, chips: best.chips };

    return {
      html: "<p>I'm a simple assistant with prepared answers, so I didn't catch that one. Try asking about Akhil's experience, projects, skills or education.</p>" +
            "<p>For anything else, email him at " + MAIL + ".</p>",
      chips: ["Who is Akhil?", "Work experience", "Projects", "Contact"],
      miss: true
    };
  }

  /* ---------------------------------------------------------
     UI
     --------------------------------------------------------- */
  var ICON_CLOSE = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>';
  var ICON_SEND = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg>';
  var ICON_RESET = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg>';

  function build() {
    var root = document.createElement("div");
    root.className = "asb-root";
    root.innerHTML =
      '<button type="button" class="asb-launcher" aria-haspopup="dialog" aria-expanded="false" aria-controls="asb-panel">' +
        '<span class="asb-launcher-dot" aria-hidden="true">AS</span><span class="asb-launcher-label">Ask about Akhil</span>' +
      "</button>" +
      '<div class="asb-panel" id="asb-panel" role="dialog" aria-modal="false" aria-label="Ask about Akhil">' +
        '<div class="asb-header">' +
          '<span class="asb-launcher-dot" aria-hidden="true">AS</span>' +
          '<div class="asb-title"><strong>Ask about Akhil</strong><span>Quick answers about his work</span></div>' +
          '<button type="button" class="asb-icon-btn asb-reset" aria-label="Start over" title="Start over">' + ICON_RESET + "</button>" +
          '<button type="button" class="asb-icon-btn asb-close" aria-label="Close chat" title="Close">' + ICON_CLOSE + "</button>" +
        "</div>" +
        '<div class="asb-log" role="log" aria-live="polite"></div>' +
        '<div class="asb-chips"></div>' +
        '<form class="asb-form" autocomplete="off">' +
          '<label class="asb-sr" for="asb-input" style="position:absolute;left:-9999px">Your question</label>' +
          '<input id="asb-input" class="asb-input" type="text" maxlength="300" placeholder="Ask a question…" />' +
          '<button type="submit" class="asb-send" aria-label="Send" disabled>' + ICON_SEND + "</button>" +
        "</form>" +
        '<div class="asb-note">Scripted answers. Nothing you type is sent anywhere.</div>' +
      "</div>";
    document.body.appendChild(root);

    var launcher = root.querySelector(".asb-launcher");
    var panel = root.querySelector(".asb-panel");
    var log = root.querySelector(".asb-log");
    var chipsEl = root.querySelector(".asb-chips");
    var form = root.querySelector(".asb-form");
    var input = root.querySelector(".asb-input");
    var send = root.querySelector(".asb-send");
    var started = false;
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function scrollDown() { log.scrollTop = log.scrollHeight; }

    function addMsg(who, content, isHtml) {
      var el = document.createElement("div");
      el.className = "asb-msg " + (who === "user" ? "asb-user" : "asb-bot");
      if (isHtml) el.innerHTML = content; else el.textContent = content;
      log.appendChild(el);
      scrollDown();
      return el;
    }

    function setChips(list) {
      chipsEl.innerHTML = "";
      (list || []).forEach(function (label) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "asb-chip";
        b.textContent = label;
        b.addEventListener("click", function () { ask(label); });
        chipsEl.appendChild(b);
      });
    }

    function welcome() {
      log.innerHTML = "";
      addMsg("bot", "<p>Hi! I'm Akhil's portfolio assistant. Ask me about his experience, projects, skills or how to get in touch.</p>", true);
      setChips(["Who is Akhil?", "Current role", "Featured project", "Skills", "Is he open to roles?", "Contact"]);
    }

    function ask(q) {
      q = String(q || "").trim();
      if (!q) return;
      addMsg("user", q, false);
      setChips([]);
      var res = answer(q);
      if (!res) return;
      var typing = document.createElement("div");
      typing.className = "asb-msg asb-bot asb-typing";
      typing.setAttribute("aria-label", "Typing");
      typing.innerHTML = "<i></i><i></i><i></i>";
      log.appendChild(typing);
      scrollDown();
      setTimeout(function () {
        typing.remove();
        addMsg("bot", res.html, true);
        setChips(res.chips);
      }, reduceMotion ? 0 : 450);
    }

    function open() {
      document.documentElement.classList.add("asb-open");
      launcher.setAttribute("aria-expanded", "true");
      if (!started) { welcome(); started = true; }
      setTimeout(function () { input.focus({ preventScroll: true }); }, 60);
    }
    function close() {
      document.documentElement.classList.remove("asb-open");
      launcher.setAttribute("aria-expanded", "false");
      launcher.focus({ preventScroll: true });
    }

    launcher.addEventListener("click", open);
    root.querySelector(".asb-close").addEventListener("click", close);
    root.querySelector(".asb-reset").addEventListener("click", function () { welcome(); input.focus(); });
    panel.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    input.addEventListener("input", function () { send.disabled = !input.value.trim(); });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = input.value;
      input.value = "";
      send.disabled = true;
      ask(q);
    });

    // Links inside answers: jump to sections / open project & paper sheets
    log.addEventListener("click", function (e) {
      var a = e.target.closest("a");
      if (!a) return;
      var isMobile = window.matchMedia("(max-width: 520px)").matches;
      if (a.hasAttribute("data-asb-click")) {
        e.preventDefault();
        var target = document.querySelector(a.getAttribute("data-asb-click"));
        if (target) {
          var section = target.closest("section[id]");
          if (section) section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
          setTimeout(function () { target.click(); }, reduceMotion ? 0 : 350);
          close();
        }
      } else if (a.hasAttribute("data-asb-nav") && isMobile) {
        close();
      }
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();

  // Exposed for testing in the console: AkhilBot.answer("does he know pytorch?")
  window.AkhilBot = { answer: answer };
})();
