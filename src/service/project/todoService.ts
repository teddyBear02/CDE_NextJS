import { env } from "@/config/varenv";


export const getTodo = async (token: any, project_id: any) => {
    const response: any = await fetch(`${env.BASE_URL}/api/todo/${project_id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }
    )

    if (response.ok) {
        const data = await response.json()
        return data.metadata
    } else {
        console.log(response);
    }
}

export const postTodo = async (token: any, data: any) => {
    const response = await fetch(`${env.BASE_URL}/api/todo`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data)
    }
    )

    if (response.ok) {
        const data = await response.json();
        return data.metadata;
    } else {
        console.log(response);
    }
}

export const editTodo = async (token: any, data: any, id: any, project_id: any) => {
    const formatdata = {
        title: data.title,
        assgin_to: data.assginTo,
        descriptions: data.descriptions,
        priorities: data.state,
        status: data.status,
        start_date: data.startDate,
        project_id: project_id,
        finish_date: data.finishDate
    }
    const response = await fetch(`${env.BASE_URL}/api/todo/${id}/${project_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formatdata)
    }
    )

    if (response.ok) {
        const data = await response.json();
        return data.metadata;
    } else {
        console.log(response);
    }
}

export const deleteTodo = async (token: any, id: any, project_id: any) => {
    const response = await fetch(`${env.BASE_URL}/api/todo/${id}/${project_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }
    )

    if (response.ok) {
        const data = await response.json();
        return data.metadata;
    } else {
        console.log(response);
    }
}