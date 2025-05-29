// projects.js - Backend API integration for projects data

import { useState, useEffect } from "react";

// API configuration
const API_BASE_URL = "http://localhost:8080";

// API service for projects
export const projectsAPI = {
  // Get all projects
  getProjects: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  },

  // Get single project by ID
  getProject: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching project ${id}:`, error);
      throw error;
    }
  },

  // Get project sections for a specific project
  getProjectSections: async (projectId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/projects/${projectId}/sections`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching sections for project ${projectId}:`, error);
      throw error;
    }
  },

  // Get all project sections (across all projects)
  getAllProjectSections: async () => {
    try {
      // Since there's no direct endpoint for all sections, we'll get all projects first
      // then get sections for each project
      const projects = await fetch(`${API_BASE_URL}/projects`);
      if (!projects.ok) {
        throw new Error(`HTTP error! status: ${projects.status}`);
      }
      const projectsData = await projects.json();

      const allSections = [];
      for (const project of projectsData) {
        try {
          const sectionsResponse = await fetch(
            `${API_BASE_URL}/projects/${project.id}/sections`
          );
          if (sectionsResponse.ok) {
            const sections = await sectionsResponse.json();
            allSections.push(...sections);
          }
        } catch (error) {
          console.warn(
            `Error fetching sections for project ${project.id}:`,
            error
          );
        }
      }

      return allSections;
    } catch (error) {
      console.error("Error fetching all project sections:", error);
      throw error;
    }
  },

  // Get single project section by ID
  getProjectSection: async (sectionId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/projects/sections/${sectionId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching section ${sectionId}:`, error);
      throw error;
    }
  },

  // Create new project
  createProject: async (projectData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  },

  // Update project
  updateProject: async (id, projectData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error updating project ${id}:`, error);
      throw error;
    }
  },

  // Delete project
  deleteProject: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return true;
    } catch (error) {
      console.error(`Error deleting project ${id}:`, error);
      throw error;
    }
  },

  // Create project section
  createProjectSection: async (projectId, sectionData) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/projects/${projectId}/sections`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sectionData),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error creating project section:", error);
      throw error;
    }
  },

  // Update project section
  updateProjectSection: async (sectionId, sectionData) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/projects/sections/${sectionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sectionData),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error updating project section ${sectionId}:`, error);
      throw error;
    }
  },

  // Delete project section
  deleteProjectSection: async (sectionId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/projects/sections/${sectionId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return true;
    } catch (error) {
      console.error(`Error deleting project section ${sectionId}:`, error);
      throw error;
    }
  },
};

// React Hook for managing projects data
export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectsAPI.getProjects();

      // Transform the data to match frontend structure
      const transformedProjects = data.map((project) => ({
        id: project.id,
        name: project.name,
        description: project.description,
        overview: project.overview,
        mainImageUrl: project.main_image_url,
        status: project.status,
        createdAt: project.created_at,
        updatedAt: project.updated_at,
        sections: project.sections || [],
      }));

      setProjects(transformedProjects);
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoading(false);
    }
  };

  const refreshProjects = () => {
    fetchProjects();
  };

  return {
    projects,
    loading,
    error,
    refreshProjects,
  };
};

// React Hook for managing project sections
export const useProjectSections = (projectId = null) => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSections();
  }, [projectId]);

  const fetchSections = async () => {
    try {
      setLoading(true);
      setError(null);

      let data;
      if (projectId) {
        data = await projectsAPI.getProjectSections(projectId);
      } else {
        data = await projectsAPI.getAllProjectSections();
      }

      // Transform the data to match frontend structure
      const transformedSections = data.map((section) => ({
        id: section.id,
        projectId: section.project_id,
        title: section.title,
        description: section.description,
        details: section.details,
        imageUrl: section.main_image_url,
        createdAt: section.created_at,
        updatedAt: section.updated_at,
      }));

      // Sort by id as default ordering since no order_index
      transformedSections.sort((a, b) => a.id - b.id);

      setSections(transformedSections);
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch project sections:", err);
    } finally {
      setLoading(false);
    }
  };

  const refreshSections = () => {
    fetchSections();
  };

  return {
    sections,
    loading,
    error,
    refreshSections,
  };
};

// Helper function to get sections for a specific project
export const getProjectSections = (projectId, allSections) => {
  return allSections
    .filter((section) => section.projectId === projectId)
    .sort((a, b) => a.id - b.id); // Sort by id since no order_index
};

// Project status constants
export const projectStatus = {
  ACTIVE: "active",
  COMPLETED: "completed",
  PLANNING: "planning",
  ON_HOLD: "on_hold",
};

// Project categories (can be moved to backend later)
export const projectCategories = [
  { id: 1, name: "Transportation", slug: "transportation", color: "#3B82F6" },
  { id: 2, name: "Healthcare", slug: "healthcare", color: "#10B981" },
  { id: 3, name: "Research Labs", slug: "research-labs", color: "#8B5CF6" },
  { id: 4, name: "Innovation", slug: "innovation", color: "#F59E0B" },
];

// Project success metrics (can be moved to backend later)
export const project_success_matrics = [
  {
    metric: "रु. 5Lakh+",
    label: "Funding Raised",
    description: "By our portfolio companies",
  },
  {
    metric: "200+",
    label: "Jobs Created",
    description: "In local communities",
  },
  {
    metric: "45+",
    label: "Startups Supported",
    description: "Through our programs",
  },
  {
    metric: "80%",
    label: "Success Rate",
    description: "Still operating after 3 years",
  },
];

// For backward compatibility, export functions that return API calls
export const getProjects = async () => {
  try {
    const data = await projectsAPI.getProjects();
    return data.map((project) => ({
      id: project.id,
      name: project.name,
      description: project.description,
      overview: project.overview,
      main_image_url: project.main_image_url,
      status: project.status,
      created_at: project.created_at,
      updated_at: project.updated_at,
    }));
  } catch (error) {
    console.error("Error getting projects:", error);
    return [];
  }
};

export const getProjectSectionsData = async () => {
  try {
    const data = await projectsAPI.getAllProjectSections();
    return data
      .map((section) => ({
        id: section.id,
        project_id: section.project_id,
        title: section.title,
        description: section.description,
        details: section.details,
        image_url: section.main_image_url,
      }))
      .sort((a, b) => a.id - b.id); // Sort by id since no order_index
  } catch (error) {
    console.error("Error getting project sections:", error);
    return [];
  }
};

// Export the API service as default
export default projectsAPI;

// // Legacy exports for backward compatibility (removed order_index)
// export const projects = [
//   {
//     id: 1,
//     name: "Bike Ambulance Project",
//     description:
//       "In rural areas, inadequate transport links hinder sustainable development by limiting access to essential services and goods. Our project focused on enhancing mountain bikes and cargo bicycles with simple electrification kits, extending ride time and towing capabilities. Additionally, we've designed a motorbike ambulance for the Dhorpatan valley, providing vital emergency transportation to the nearest town of Burtibag.",
//     overview:
//       "With teams from Tribhuvan University, Swansea University, and Kyambogo University, we focused on two key objectives: developing a collaborative research strategy and designing practical solutions for bike electrification. Explore how we're making an impact in sustainable transportation.",
//     main_image_url:
//       "https://lh6.googleusercontent.com/AY860DZzUTWkCDM-OojLhDrQ1NKPQgXgzuj9uo7ojHa6Hg0WmiSluWbju2kHMzrjeVCh_yVu4NRtE78B_QhbsewtTihEOEWQdDCGy7QlzAUwmu_zqUaRfkDZGdq8Nj6HCg=w1280",
//     status: "completed",
//     created_at: "2021-03-11",
//     updated_at: "2021-03-13",
//   },
//   {
//     id: 2,
//     name: "Disinfectant Robot",
//     description:
//       "This project was awarded by the Nepal Academy of Science and Technology as part of its COVID-19 Combat and Innovation Program. The initiative aimed to address the rapid spread of the COVID-19 disease by devising a strategy to minimize human exposure through the deployment of robots for disinfection procedures within hospital settings in Kathmandu.",
//     overview:
//       "The study anticipated that this approach would prove instrumental in reducing the likelihood of secondary infections among COVID-19 patients, thanks to the effective removal of bacterial and fungal pathogens responsible for nosocomial infections. The project received approval in mid-July 2020 and was successfully concluded by the end of October 2020.",
//     main_image_url:
//       "https://lh4.googleusercontent.com/BBxLGIL42PLUJ8po5tfKst2oqNdCXPucgloRRJwXZe09Ot86VsWNHkLmIIWBY_dRp7jhWI8NcjSwU-NLp2MAAT0=w1280",
//     status: "completed",
//     created_at: "2020-07-15",
//     updated_at: "2020-10-31",
//   },
//   {
//     id: 3,
//     name: "Flow Visualization Lab",
//     description:
//       "Advanced flow visualization laboratory equipped with state-of-the-art equipment for aerodynamic and fluid dynamics research. The lab features multiple experimental setups including wind tunnels, PIV systems, and high-speed imaging capabilities.",
//     overview:
//       "This comprehensive laboratory facility supports research and education in mechanical and aerospace engineering, providing hands-on experience with modern flow measurement and visualization techniques.",
//     main_image_url: "https://i.postimg.cc/zvnTg2qD/flow-viz-2.jpg",
//     status: "active",
//     created_at: "2022-01-01",
//     updated_at: "2024-12-31",
//   },
// ];

// export const project_sections = [
//   // Bike Ambulance Project sections
//   {
//     id: 1,
//     project_id: 1,
//     title: "Trail Evaluation",
//     description:
//       "The trail evaluation took place from March 11th to 13th, 2021, with varying weather conditions throughout the three-day period. The trail encompasses diverse terrain, commencing with a pleasant climb out of Dhorpatan valley, followed by a descent towards Nisel Dhor along the Uttar ganga river.",
//     details:
//       "The route meanders along the sides of three hills, offering a gradual descent interspersed with occasional steep ascents, culminating in a long, taxing final ascent before Nisel Dhor. The journey begins at the Dhorpatan Hunting Reserve entry check post, with almost half of the route traversing a flat, picturesque valley.",
//     image_url:
//       "https://lh5.googleusercontent.com/IsB7Wqy4pDCn4EYj9vh_bozTC53K7UI9Yg2U4VwNnXOLgqWtDRnxSe6WwgpIV0x-sOOylhLhQ8qgBALXhtqMCxclhD0s2WJdFxTzKUtyYYqTItoXsK6qRzwLQz9KIssRQQ=w1280",
//   },
//   {
//     id: 2,
//     project_id: 1,
//     title: "Bike Modification",
//     description:
//       "The project team undertook the modification of two two-wheelers, each serving distinct purposes. One entailed the conversion of a mountain bike into an electric-powered vehicle employing a 48v 750w mid-drive motor for extended ride durations and tourism activities.",
//     details:
//       "A 500 CC bullet bike was repurposed as the towing apparatus for a medical trailer, facilitating the conveyance of patients to the nearest medical facility. The trailer was outfitted with first aid kits, oxygen cylinder compartment, and a 360-degree rotation patient bed designed for steep terrain transportation.",
//     image_url:
//       "https://lh3.googleusercontent.com/LTl_sf0LgAnExUFJHHfS4Zxo71SvyP1EOfbWGaUJlJTgQU32NVifKnjiX7t0h4fflbSKLgGVLMmQvW7l-MGz2qxBRANGHCgl5QPuEYGZbPCn50kpZtBzDAwW2kqFPuldJQ=w1280",
//   },
//   {
//     id: 3,
//     project_id: 1,
//     title: "Assets Handover",
//     description:
//       "The Campus Chief of the Institute of Engineering, Pulchowk Campus, formally transferred the project assets to the representative of BBB Dhorpatan MTB & Adventure Co., in accordance with the Energising Development project objectives.",
//     details:
//       "These products were purposefully designed to cater to the specific requirements of the Dhorpatan community, addressing their distinct transportation needs. The construction was undertaken with a strong commitment to sustainability, championing environmentally responsible transportation solutions.",
//     image_url:
//       "https://lh6.googleusercontent.com/uNm6rUE4w2X6i2kLWamywLx5PYjmLMiRHv8fWuXem_PtBXg1M67TNNlsDSm9jOnpW5xyoYys8nmgVvkUUKaFgYaVwBRyc2GynoMF0vxTdx-NO3YK6cquxii_OuYor5oU2w=w1280",
//   },

//   // Disinfectant Robot sections
//   {
//     id: 4,
//     project_id: 2,
//     title: "Design",
//     description:
//       "The updated version features a robust full-metallic body for enhanced strength and agility, replacing the previous transparent design. With reduced overall size and increased ground clearance due to new 15 cm diameter wheels, the internal space is more compact and thoughtfully arranged.",
//     details:
//       "Version 2.0 introduces a new mopping system at the rear and stands at 60 cm height with a distinctive curvilinear design in dark green. A dedicated compartment ensures the safety of the motherboard and power source.",
//     image_url:
//       "https://lh4.googleusercontent.com/qXLllUO43fDxHbaOKhq8hekxVx71rW0Pho10i7-0qcze0to8Vly3LvR9rcxaJZiF-6ovwFGU1bJ9bubD-xqGxUjYCbItyr05VmdW_DUEqWqeM2Qxm3DnDJ_oorhTAbPxYA=w1280",
//   },
//   {
//     id: 5,
//     project_id: 2,
//     title: "Parts",
//     description:
//       "The majority of electronic components remain consistent with the initial version. The primary modifications pertain to the physical structure, involving alterations of various mechanical parts and components.",
//     details:
//       "Key additions include a fully metallic disinfectant tank (3L capacity), larger tires, high-torque 100 RPM 12V DC motor for the sweeping mop, 12V lead battery replacement, and a new variable dispersion nozzle housed within a fully metallic arm.",
//     image_url:
//       "https://lh6.googleusercontent.com/kzf8_0oxyS2wD96ffCa0UdOtI0_gPf15TYvnW7GW7jY1JwcUkKp-AdrnJO3Ko2nbnAQZmmUnhggFbWT7LvMqJRU=w1280",
//   },
//   {
//     id: 6,
//     project_id: 2,
//     title: "Mechanism",
//     description:
//       "The new version retains the differential wheel drive mechanism with a significant addition of a 7-inch mop powered by a high-torque DC motor. The arm design features a base-shifted joint with 2 degrees of freedom.",
//     details:
//       "Arm movement maintains expanded range of 360 degrees horizontally, up from 180 degrees in the previous version. The 35 cm total height arm design replaces the initial two-half system.",
//     image_url:
//       "https://lh4.googleusercontent.com/BBxLGIL42PLUJ8po5tfKst2oqNdCXPucgloRRJwXZe09Ot86VsWNHkLmIIWBY_dRp7jhWI8NcjSwU-NLp2MAAT0=w1280",
//   },

//   // Flow Visualization Lab sections
//   {
//     id: 7,
//     project_id: 3,
//     title: "Low Speed Wind Tunnel",
//     description:
//       "The first low speed (open-circuit) wind tunnel facility at the Department of Mechanical and Aerospace Engineering. The tunnel driven by 16 centrifugal fans each rated with 500-watt output power can provide maximum velocity of ~12 m/s.",
//     details:
//       "The test section has a cross-section of 250 mm x 250 mm with 1050mm span, designed for aerodynamic testing and research applications in mechanical and aeronautical engineering.",
//     image_url:
//       "https://lh5.googleusercontent.com/TVEjkMTfLbiVQunwJg45xiypcH-3nDNd1z6Qc26EYsKmjqnI1HCNI7OlEz2aIm0DfqIr9yZl7HHZEHZzIYZ_CjWm2Rx_IGTzr6yTuZeDCc2v0qIiYqK3-rvNYd9bSgG1iw=w1280",
//   },
//   {
//     id: 8,
//     project_id: 3,
//     title: "PIV Water Tank",
//     description:
//       "The water tank (200 cm x 61 cm x 50 cm) is equipped with a velocity-controlled 210cm long gantry system. 2GT 6mm belt drives the gantry head with load cell and test specimen attached.",
//     details:
//       "Equipped for Particle Imaging Velocimetry (PIV) data capture with class IIIB laser (~5mW output), high speed camera, DAQ system, and opensource software for force measurements and flow measurement using PIV.",
//     image_url:
//       "https://lh6.googleusercontent.com/X_rqipKHlVcgDL5wSWjAKrXsJUsuEdpYlnpC9Oyb1djW5V0VlczO46SzTYZpf_UNtXByVYuJTxCo_Mh4_gXHNnOXUe4Sg9g9dcFWv4ZqpYvJ1HP4UywU73iEu4Vu44tWSg=w1280",
//   },
//   {
//     id: 9,
//     project_id: 3,
//     title: "Schlieren Imaging System",
//     description:
//       "The z-type schlieren system has two 76mm diameter mirrors of 400mm focal length. Sony ZV-E10 Mirrorless Camera and 2.1 Chronos high speed camera complements the experimental setup.",
//     details:
//       "Used for experimental study of Mach/shock diamonds from CD-nozzle, thermal plume of flames, convective flow of preheated objects, and Fluidic-Coanda (FC) nozzle with suction pipes.",
//     image_url:
//       "https://lh6.googleusercontent.com/UGVRPFSBWW75owHbSsI2i0D0Vwfbv0XfnaUsBtPcJ-wpffwic-YSj_aYP9U3DKhowY5bBGdnXzgUi5ARjokGJjxG-2OuINfbsNC30Q5H6J0rQOIjj0GDIuxQLcXv0Gi9lA=w1280",
//   },
//   {
//     id: 10,
//     project_id: 3,
//     title: "Advanced Schlieren Setup",
//     description:
//       "Z-type schlieren setup including two parabolic mirrors of diameter 200 mm and focal length 1500 mm, LED light, and precision knife-edge for enhanced imaging capabilities.",
//     details:
//       "This larger setup provides improved resolution and sensitivity for detailed flow visualization studies and advanced research applications.",
//     image_url:
//       "https://lh6.googleusercontent.com/s7VMBiOU0OcRVa9ErY-Yw9lJADmXZiA0fYJqhMseDrbbX4eu8S8ZYAVT2EbYXu9Xs80sB0VkZoHSW4pZ-xEVqYuLp4tTIJL7tOj1ZJ0k03Exmmq_KK1U-BWHrG6rppbVUA=w1280",
//   },
//   {
//     id: 11,
//     project_id: 3,
//     title: "High Speed Imaging",
//     description:
//       "The Chronos 2.1-HD high-speed camera supports range of applications including Vibration Analysis, Schlieren Imaging, and Particle Image Velocimetry (PIV).",
//     details:
//       "Features 2.1Gpx/s, Full HD 1920×1080 image sensor capturing 1,000 fps, and up to 24,046 fps at lower resolution for detailed temporal analysis of fluid phenomena.",
//     image_url:
//       "https://lh5.googleusercontent.com/I_yrbwgYQDKPG38UHN0tzpqaNk1s4eTCNAWKZZI1Afa1TNyJAOp9M2iIhaaqRiC1t0Qe5YH389H_z6Zrg6Kj9d0rgta4Sn7psMKT-6jnpywJ9VfgLGDUYHD3pSoqAtO4=w1280",
//   },
//   {
//     id: 12,
//     project_id: 3,
//     title: "Shock Tunnel",
//     description:
//       "The manual driven shock tube has 300 mm X 400 mm dump tank with test section of 150mm X 150mm X 200 mm for high-speed flow studies.",
//     details:
//       "The convergent-divergent nozzle fitted in the tunnel is capable of producing exit velocity ratio of Mach 5.2 for supersonic flow research and testing applications.",
//     image_url:
//       "https://lh3.googleusercontent.com/zNq2oSU9kIgJglnI9i8ohKDmuKtQi6qNC0xGSxG0tIsTRbten3NSP7PupXJV7ky7x4CJBmb6SwLQtOkUeViLjfhrUwTkcrVKJbBClKOEn4QH_flfHvO-ypAOEaR-bsgs7w=w1280",
//   },
// ];
