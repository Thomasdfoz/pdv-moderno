import { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Plus, Edit, Trash2, Search } from 'lucide-react';

export function Products() {
    const { products, addProduct, updateProduct, deleteProduct } = useStore();
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        cost: '',
        stock: '',
        category: '',
        barcode: '',
    });

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.barcode.includes(search)
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const productData = {
            ...formData,
            price: parseFloat(formData.price),
            cost: parseFloat(formData.cost),
            stock: parseInt(formData.stock),
        };

        if (editingProduct) {
            updateProduct(editingProduct.id, productData);
        } else {
            addProduct(productData);
        }

        handleCloseModal();
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            price: product.price.toString(),
            cost: product.cost.toString(),
            stock: product.stock.toString(),
            category: product.category,
            barcode: product.barcode,
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
        setFormData({
            name: '',
            price: '',
            cost: '',
            stock: '',
            category: '',
            barcode: '',
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Produtos</h2>
                    <p className="text-slate-400">Gerencie seu estoque</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
                    <Plus size={20} />
                    Novo Produto
                </Button>
            </div>

            {/* Search */}
            <Card>
                <CardContent className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                        <Input
                            placeholder="Buscar por nome, categoria ou código de barras..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Products Table */}
            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-slate-800">
                                <tr className="text-left">
                                    <th className="px-6 py-4 text-sm font-medium text-slate-400">Produto</th>
                                    <th className="px-6 py-4 text-sm font-medium text-slate-400">Categoria</th>
                                    <th className="px-6 py-4 text-sm font-medium text-slate-400">Preço</th>
                                    <th className="px-6 py-4 text-sm font-medium text-slate-400">Custo</th>
                                    <th className="px-6 py-4 text-sm font-medium text-slate-400">Estoque</th>
                                    <th className="px-6 py-4 text-sm font-medium text-slate-400">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium text-white">{product.name}</p>
                                                <p className="text-sm text-slate-400">{product.barcode}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant="primary">{product.category}</Badge>
                                        </td>
                                        <td className="px-6 py-4 text-white font-medium">
                                            R$ {product.price.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 text-slate-400">
                                            R$ {product.cost.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant={product.stock < 10 ? 'danger' : 'success'}>
                                                {product.stock} un.
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleEdit(product)}
                                                >
                                                    <Edit size={16} />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => {
                                                        if (confirm('Confirma a exclusão deste produto?')) {
                                                            deleteProduct(product.id);
                                                        }
                                                    }}
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredProducts.length === 0 && (
                            <div className="text-center py-12 text-slate-400">
                                Nenhum produto encontrado
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Product Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingProduct ? 'Editar Produto' : 'Novo Produto'}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Nome do Produto"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    <Input
                        label="Código de Barras"
                        value={formData.barcode}
                        onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                        required
                    />
                    <Input
                        label="Categoria"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Preço de Venda"
                            type="number"
                            step="0.01"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            required
                        />
                        <Input
                            label="Custo"
                            type="number"
                            step="0.01"
                            value={formData.cost}
                            onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                            required
                        />
                    </div>
                    <Input
                        label="Estoque Inicial"
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        required
                    />
                    <div className="flex gap-3 pt-4">
                        <Button type="submit" className="flex-1">
                            {editingProduct ? 'Atualizar' : 'Adicionar'}
                        </Button>
                        <Button type="button" variant="outline" onClick={handleCloseModal} className="flex-1">
                            Cancelar
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
