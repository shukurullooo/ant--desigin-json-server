import { useEffect, useState } from "react";
import { api } from "../api";
import {
  Button,
  Card,
  Modal,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Select,
  Empty,
  Layout,
} from "antd";
import { Image } from "antd";
import DrinkSlider from "./DrinkSlider";
const { Meta } = Card;
const { Header, Content, Footer } = Layout;

const Fruits = () => {
  const [data, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [createLoading, setCreateLoading] = useState(false);

  const fetchData = () => {
    api.get("/drinks").then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditItem(null);
  };

  const onFinish = (values) => {
    setCreateLoading(true);
    const method = editItem ? api.put(`/drinks/${editItem.id}`, values) : api.post(`/drinks`, values);
    method
      .then(() => {
        fetchData();
        handleCancel();
      })
      .finally(() => setCreateLoading(false));
  };

  const handleDelete = (id) => {
    api.delete(`/drinks/${id}`).then(fetchData);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    showModal();
  };

  return (
<>
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ color: "#fff", fontSize: 22, fontWeight: "bold" }}>
        Drinks Dashboard
    
      </Header>
       <div style={{ maxWidth: 1000, margin: "0 auto", padding: 24 }}>
      <DrinkSlider />
    </div>
      <Content style={{ padding: "24px 50px" }}>
        <div>
          <h2 className="text-2xl font-bold my-4">Drinks</h2>
          <Button onClick={showModal} type="primary">
            Create
          </Button>

          {!data?.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="mt-6" />}

          <div className="container mx-auto flex gap-6 flex-wrap mt-6">
            {data?.map((item) => (
              <Card
                hoverable
                key={item.id}
                className="w-[260px]"
                cover={
                  <Image
                    style={{ height: 180 }}
                    className="h-[180px] object-contain w-full"
                    src={item.image}
                  />
                }
              >
                <Meta title={item.title} description={item.company_name} />
                <div className="mt-2 text-sm">
                  <p><strong>Narx:</strong> {item.price} so'm</p>
                  <p><strong>Hajmi:</strong> {item.volume}</p>
                  <p><strong>Turi:</strong> {item.type}</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <Popconfirm
                    title="Ichimlikni o‘chirish"
                    description="Rostdan ham o‘chirilsinmi?"
                    onConfirm={() => handleDelete(item.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button htmlType="button" danger>
                      Delete
                    </Button>
                  </Popconfirm>
                  <Button onClick={() => handleEdit(item)}>Edit</Button>
                </div>
              </Card>
            ))}
          </div>

          {isModalOpen && (
            <Modal
              title={`${editItem ? "Update" : "Create"} Drink`}
              open={isModalOpen}
              onCancel={handleCancel}
              footer={false}
            >
              <Form
                name="drinkForm"
                initialValues={editItem}
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
              >
                <Form.Item
                  label="Ichimlik nomi"
                  name="title"
                  rules={[{ required: true, message: "Ichimlik nomini kiriting" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Kompaniya"
                  name="company_name"
                  rules={[{ required: true, message: "Kompaniya nomini kiriting" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Narx"
                  name="price"
                  rules={[{ required: true, message: "Narxni kiriting" }]}
                >
                  <InputNumber className="w-full" min={0} />
                </Form.Item>

                <Form.Item
                  label="Hajmi"
                  name="volume"
                  rules={[{ required: true, message: "Hajmini kiriting (masalan: 0.5L)" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Turi"
                  name="type"
                  rules={[{ required: true, message: "Turini tanlang" }]}
                >
                  <Select>
                    <Select.Option value="gazli">Gazli</Select.Option>
                    <Select.Option value="gazsiz">Gazsiz</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Rasm URL"
                  name="image"
                  rules={[{ required: true, message: "Rasm URL manzilini kiriting" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item>
                  <Button
                    loading={createLoading}
                    className="w-full"
                    type="primary"
                    htmlType="submit"
                  >
                    {editItem ? "Update" : "Create"}
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          )}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Drinks Dashboard ©2024 Created with Ant Design
      </Footer>
    </Layout>

</>

  );
};

export default Fruits;
