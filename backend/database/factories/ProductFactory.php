<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->unique()->text(20),
            'description' => $this->faker->text,
            'brand' => $this->faker->text(10),
            'quantity' => $this->faker->biasedNumberBetween(10, 50),
            'price' => $this->faker->biasedNumberBetween(10.50, 150.99),
        ];
    }
}
