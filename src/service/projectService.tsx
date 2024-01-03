const projectService = {
  //....................GET project......................//
  async getProject(token: any) {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/project", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.metadata;
      } else {
        const errorData = await response.json();
        console.error("Add new tag failed:", errorData);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  },

  //...................POST project......................//
  async handleCreateProject(data: any, token: any) {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Add new project successful:", data.metadata);
        return data.metadata;
      } else {
        const errorData = await response.json();
        console.error("Add new tag failed:", errorData);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  },
};

export default projectService;
