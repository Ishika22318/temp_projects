import { batchDetailsAPI } from '../services/batchapi'; 
import { BatchUrl, usersUrl } from '../utils/url';
const mockData = {
    "success": true,
    "data": {
    "_id": "651116feb23a43282d4f0596",
    "batch_name": "jan23",
    "description": "This Batch is created on 25/12/2023.",
    "created_by": "Abhishek",
    "status": "In Progress",
    "start_date": "2023-09-20T00:00:00.000Z",
    "end_date": "2023-09-26T00:00:00.000Z",
    "updated_on": "2023-09-25T05:13:34.173Z",
    "program": [
        "Generic Training",
        "Soft Skills Traning",
        "Technical Skills Training"
    ],
    "role": [
        "Business Analyst",
        "Data Engineer",
        "Framework Engineer",
        "Machine Learning Engineer",
        "Platform Engineer"
    ],
    "coursesID": [
        "65086412c2fee771d3c6d566",
        "650863ebc2fee771d3c6d557",
        "65086447c2fee771d3c6d575",
        "6508644fc2fee771d3c6d584",
        "6508646bc2fee771d3c6d593",
        "65086488c2fee771d3c6d5a2",
        "6508648fc2fee771d3c6d5b1",
        "65086493c2fee771d3c6d5c0",
        "65086498c2fee771d3c6d5cf",
        "6508649fc2fee771d3c6d5de",
        "650864acc2fee771d3c6d5ed",
        "650864b5c2fee771d3c6d5fc",
        "650864bdc2fee771d3c6d60b",
        "650864d8c2fee771d3c6d61a",
        "65086fef608081e3803ac3b6"
    ]
    }
}

const mockUsers = 
{
    "success": true,
    "data": [
      {
        "role": "Intern",
        "profilePicture": "https://i.stack.imgur.com/l60Hf.png",
        "id": "64f5eec4f5236428955d9caf",
        "email": "madhwan.phadtare@quantiphi.com",
        "name": "Madhwan Phadtare",
        "jobRole": "Framework Engineer",
        "batchId": "651116feb23a43282d4f0596",
        "addedBy": "Admin 1",
        "addedDate": "2023-05-04",
        "updatedDate": "2023-10-03",
        "contact": "910000000001",
        "status": "true",
        "released": "true",
        "assignedMentors": [
          {
            "name": "Harish S",
            "email": "harish.s@quantiphi.com"
          }
        ]
      },
      {
        "role": "Intern",
        "profilePicture": "https://i.stack.imgur.com/l60Hf.png",
        "id": "64f5efe222ad59c1ef46a56e",
        "email": "Harsh.muralia@quantiphi.com",
        "name": "Harsh Muralia",
        "jobRole": "Framework Engineer",
        "batchId": "651116feb23a43282d4f0596",
        "addedBy": "Admin 1",
        "addedDate": "2023-05-04",
        "updatedDate": "2023-10-04",
        "contact": "+91-00000-00000",
        "status": "true",
        "released": "true",
        "assignedMentors": []
      },
      {
        "role": "Admin",
        "profilePicture": "https://i.stack.imgur.com/l60Hf.png",
        "id": "64f5f00410bb478d87ce53cd",
        "email": "Shivam.Rai@quantiphi.com",
        "name": "Shivam Rai",
        "jobRole": "Framework Engineer",
        "addedBy": "Admin 1",
        "addedDate": "2023-05-04",
        "updatedDate": "2023-09-21",
        "contact": "+91-00000-00000",
        "status": "true",
        "released": "true"
      },
      {
        "role": "Intern",
        "profilePicture": "https://i.stack.imgur.com/l60Hf.png",
        "id": "64f5f03994e3c1c415c42cfe",
        "email": "ayush@quantiphi.com",
        "name": "Ayush Kumar",
        "jobRole": "Framework Engineer",
        "batchId": "651116feb23a43282d4f0596",
        "addedBy": "Admin 1",
        "addedDate": "2023-05-04",
        "updatedDate": "2023-10-04",
        "contact": "+91-00000-0001",
        "status": "true",
        "released": "true",
        "assignedMentors": [
          {
            "name": "Harish S",
            "email": "harish.s@quantiphi.com"
          }
        ]
      },
      {
        "role": "Mentor",
        "profilePicture": "https://i.stack.imgur.com/l60Hf.png",
        "id": "64f5f0fd4d1259c4da27fd7c",
        "email": "harish.s@quantiphi.com",
        "name": "Harish S",
        "jobRole": "Framework Engineer",
        "batchId": "650882fb28b0fca37188ec0e",
        "addedBy": "Admin 1",
        "addedDate": "2023-05-04",
        "updatedDate": "2023-09-28",
        "contact": "+91-00000-00000",
        "status": "true",
        "released": "true",
        "assignedInterns": [
          {
            "name": "Ayush Kumar",
            "email": "ayush@quantiphi.com"
          },
          {
            "name": "test1",
            "email": "test1@test.com"
          },
          {
            "name": "Madhwan Phadtare",
            "email": "madhwan.phadtare@quantiphi.com"
          },
          {
            "name": "Ayush",
            "email": "ayushtiwari1180@gmail.com"
          }
        ]
      },
      {
        "role": "Admin",
        "profilePicture": "https://i.stack.imgur.com/l60Hf.png",
        "id": "64f5f14689632dd9e644a319",
        "email": "Shainee.jain@quantiphi.com",
        "name": "Shainee Jain",
        "jobRole": "Framework Engineer",
        "batchId": "650882fb28b0fca37188ec0e",
        "addedBy": "Admin 1",
        "addedDate": "2023-05-04",
        "updatedDate": "2023-09-26",
        "contact": "+91-00000-00000",
        "status": "true",
        "released": "true"
      },
      {
        "role": "Mentor",
        "profilePicture": "https://i.stack.imgur.com/l60Hf.png",
        "id": "64f5f15f5720d883e6cb62b6",
        "email": "moses.arepelli@quantiphi.com",
        "name": "Moses Arepelli",
        "jobRole": "Framework Engineer",
        "addedBy": "Admin 1",
        "addedDate": "2023-05-04",
        "updatedDate": "2023-09-28",
        "contact": "+91-00000-00000",
        "status": "true",
        "released": "true",
        "assignedInterns": [
          {
            "name": "Ayush",
            "email": "ayushtiwari1180@gmail.com"
          }
        ]
      },
      {
        "role": "Intern",
        "id": "6515216c8cbf649afdc9e948",
        "email": "test1@test.com",
        "name": "test1",
        "jobRole": "Framework Engineer",
        "batchId": "651116feb23a43282d4f0596",
        "addedBy": "Shivam Rai",
        "addedDate": "2023-09-28",
        "updatedDate": "2023-09-28",
        "contact": "6767878877",
        "status": "true",
        "released": "false",
        "assignedMentors": [
          {
            "name": "Harish S",
            "email": "harish.s@quantiphi.com"
          }
        ]
      },
      {
        "role": "Intern",
        "id": "651521828cbf649afdc9e952",
        "email": "test2@test.com",
        "name": "test2",
        "jobRole": "Business Analyst",
        "batchId": "651116feb23a43282d4f0596",
        "addedBy": "Shivam Rai",
        "addedDate": "2023-09-28",
        "updatedDate": "2023-10-04",
        "contact": "7686767676",
        "status": "false",
        "released": "false",
        "assignedMentors": []
      },
      {
        "role": "Intern",
        "id": "6516b1af0469c60e93fb83ca",
        "email": "test@gmail.com",
        "name": "test5",
        "jobRole": "Business Analyst",
        "batchId": "651116feb23a43282d4f0596",
        "addedBy": "Shivam Rai",
        "addedDate": "2023-09-29",
        "updatedDate": "2023-10-04",
        "contact": "8743215600",
        "status": "true",
        "released": "true",
        "assignedMentors": []
      },
      {
        "role": "Intern",
        "id": "651a4cfbef842f9d759b212f",
        "email": "ayushtiwari1180@gmail.com",
        "name": "Ayush",
        "jobRole": "Framework Engineer",
        "batchId": "651116feb23a43282d4f0596",
        "addedBy": "Shivam Rai",
        "addedDate": "2023-10-02",
        "updatedDate": "2023-10-04",
        "contact": "916868686868",
        "status": "true",
        "released": "false",
        "assignedMentors": [
          {
            "name": "Harish S",
            "email": "harish.s@quantiphi.com"
          },
          {
            "name": "Moses Arepelli",
            "email": "moses.arepelli@quantiphi.com"
          }
        ]
      }
    ]
  }

jest.mock('../utils/url');

describe('batchDetailsAPI', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('Batch Details API', async () => {
    const batchId = 'batch_id';
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUsers,
      });
    const result = await batchDetailsAPI(batchId);
    expect(global.fetch).toHaveBeenCalledWith(`${BatchUrl}${batchId}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    expect(global.fetch).toHaveBeenCalledWith(usersUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    expect(result).toEqual({ data: mockData, usersJson: mockUsers });
  });

  it('throws Unauthorized error for status 401', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      status: 401,
    });

    await expect(batchDetailsAPI('exampleBatchId')).rejects.toThrow('Unauthorized');
  });

  it('throws Not Found error for status 404', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      status: 404,
    });
    await expect(batchDetailsAPI('exampleBatchId')).rejects.toThrow('Not Found');
  });

  it('throws Internal Server Error for other error statuses', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      status: 500,
    });

    await expect(batchDetailsAPI('exampleBatchId')).rejects.toThrow('Internal Server Error');
  });

  it('throws error when fetch fails', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('Failed to fetch'));
    await expect(batchDetailsAPI('exampleBatchId')).rejects.toThrow('Failed to fetch');
  });
});



