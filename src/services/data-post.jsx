export const DataPost = [
    {
        ID: 1,
        postUserInfo: {
            userId: 1,
            userName: "kuddus-boyati",
            displayName: "Kuddus Boyati Cheta",
            profilePhoto: "resources/users/id-1/profile-photo.jpg",
        },
        postTime: {
            time: "10:50 am",
            date: "10/11/2019"
        },
        postContent: {
            message: "<b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry.",
            images: [
                "resources/users/shared/post-ite.jpg",
                "resources/users/shared/post-ite.jpg"
            ]
        },
        postActivities: {
            reactions: {
                likes: {
                    count: 420,
                    users: [1, 2, 3]
                },
                dislikes: {
                    count: 50,
                    users: [8, 6, 66]
                }
            },
            comments: [
                {
                    id: 1,
                    userName: "kuddus-boyati",
                    displayName: "Pagla Commenter",
                    message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
                    reactions: {
                        likes: {
                            count: 5,
                            users: [1, 2, 3, 4, 5]
                        },
                        dislikes: {
                            count: 2,
                            users: [8, 6]
                        },
                        replies: [
                            {
                                userId: 5,
                                message: "Lorem Ipsum is simply dummy"
                            },
                            {
                                userId: 7,
                                message: "Lorem Ipsum is simply dummy"
                            }
                        ]
                    }
                },
                
                {
                    id: 1,
                    userName: "another-kuddus-boyati",
                    displayName: "Another Pagla Commenter",
                    message: "Lorem Ipsum is simply dummy",
                    reactions: {
                        likes: {
                            count: 5,
                            users: [1, 2, 3, 4, 5]
                        },
                        dislikes: {
                            count: 2,
                            users: [8, 6]
                        },
                        replies: [
                            {
                                userId: 5,
                                message: "Lorem Ipsum is simply dummy"
                            },
                            {
                                userId: 7,
                                message: "Lorem Ipsum is simply dummy"
                            }
                        ]
                    }
                }
            ]
        }
    },
    {
        ID: 2,
        postUserInfo: {
            userId: 2,
            userName: "pagla-boyati",
            displayName: "Pagla Boyati",
            profilePhoto: "resources/users/id-2/post-it.jpg",
        },
        postTime: {
            time: "12:55 am",
            date: "12/11/2019"
        },
        postContent: {
            message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            images: 0
        },
        postActivities: {
            reactions: {
                likes: {
                    count: 420,
                    users: [1, 2, 3]
                },
                dislikes: {
                    count: 50,
                    users: [8, 6, 66]
                }
            },
            comments: [
                {
                    id: 1,
                    userName: "kuddus-boyati",
                    displayName: "Pagla Commenter",
                    message: "Lorem Ipsum is simply dummy",
                    reactions: {
                        likes: {
                            count: 5,
                            users: [1, 2, 3, 4, 5]
                        },
                        dislikes: {
                            count: 2,
                            users: [8, 6]
                        },
                        replies: [
                            {
                                userId: 5,
                                message: "Lorem Ipsum is simply dummy"
                            }
                        ]
                    }
                }
            ]
        }
    }
]